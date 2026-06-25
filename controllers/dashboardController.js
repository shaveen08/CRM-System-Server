const Lead = require("../models/leadsSchema");
const Contact = require("../models/contactsSchema");
const Activity = require("../models/activitySchema");
const Appointments = require("../models/appointmentsSchema");
const Users = require("../models/usersSchema");

const getDashboardData = async (req, res) => {
  try {
    // Basic counts ------------------------------------------------------------------------ /
    const [totalContacts, totalActivities, totalAppointments, totalUsers] =
      await Promise.all([
        Contact.countDocuments(),
        Activity.countDocuments(),
        Appointments.countDocuments(),
        Users.countDocuments(),
      ]);

    // KPI: Pending, Completed, Revenue ---------------------------------------------------- /
    const leadStats = await Lead.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    //  Total Leads
    const totalLeads = leadStats.reduce((sum, s) => sum + s.count, 0);

    // Pending Leads
    const pendingLeads = leadStats.find((s) => s._id === "Pending")?.count || 0;

    // Completed Leads
    const completedLeads =
      leadStats.find((s) => s._id === "Completed")?.count || 0;

    // Confirmed Leads
    const confirmedLeads =
      leadStats.find((s) => s._id === "Confirmed")?.count || 0;

    // Dropped Leads
    const droppedLeads = leadStats.find((s) => s._id === "Dropped")?.count || 0;

    // Revenue: sum of dealValue across all leads -------------------------------------------- /
    const revenueAgg = await Lead.aggregate([
      { $group: { _id: null, total: { $sum: "$dealValue" } } },
    ]);

    // Total Revenue
    const totalRevenue = revenueAgg[0]?.total || 0;

    // Conversion Rate Calcultation
    const conversionRate =
      totalLeads > 0
        ? `${((completedLeads / totalLeads) * 100).toFixed(1)}%`
        : "0%";

    // All Leads --------------------------------------------------------------------------------- /
    const allLeads = await Lead.find(
      {},
      { status: 1, createdAt: 1, dealValue: 1 },
    ).lean();

    const monthlyMap = {};
    const weeklyMap = {};
    const dailyMap = {};

    allLeads.forEach((lead) => {
      if (!lead.createdAt) return;

      // --- Week Key: This date calc is to get weekly key ------------------------------------------------ //
      const date = new Date(lead.createdAt);
      const oneJan = new Date(date.getFullYear(), 0, 1);
      const week = Math.ceil(
        (Math.floor((date - oneJan) / 86400000) + date.getDay() + 1) / 7,
      );
      const weekKey = `${date.getFullYear()}-W${week}`;
      // ---------------------------------------------------------------------------------------- //

      const monthKey = lead.createdAt.toISOString().substring(0, 7);
      const dailyKey = lead.createdAt.toISOString().substring(0, 10);

      // Mothly Map
      if (!monthlyMap[monthKey]) {
        monthlyMap[monthKey] = { total: 0, converted: 0, dropped: 0 };
      }
      monthlyMap[monthKey].total += 1;

      if (lead.status === "Completed") monthlyMap[monthKey].converted += 1;
      if (lead.status === "Dropped") monthlyMap[monthKey].dropped += 1;

      // Weekly Map
      if (!weeklyMap[weekKey]) {
        weeklyMap[weekKey] = { total: 0, converted: 0, dropped: 0 };
      }
      weeklyMap[weekKey].total += 1;

      if (lead.status === "Completed") weeklyMap[weekKey].converted += 1;
      if (lead.status === "Dropped") weeklyMap[weekKey].dropped += 1;

      // Daily Map
      if (!dailyMap[dailyKey]) {
        dailyMap[dailyKey] = { total: 0, converted: 0, dropped: 0 };
      }
      dailyMap[dailyKey].total += 1;

      if (lead.status === "Completed") dailyMap[dailyKey].converted += 1;
      if (lead.status === "Dropped") dailyMap[dailyKey].dropped += 1;
    });

    // Conversion Map for charts ------------------------------------------------------------------- /

    // Monthly
    const monthlyConversion = Object.entries(monthlyMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, val]) => ({
        label: new Date(key + "-01").toLocaleString("en-US", {
          month: "short",
          year: "2-digit",
        }),
        total: val.total,
        converted: val.converted,
        dropped: val.dropped,
        rate:
          val.total > 0
            ? parseFloat(((val.converted / val.total) * 100).toFixed(1))
            : 0,
      }));

    // Weekly
    const weeklyConversion = Object.entries(weeklyMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, val]) => ({
        label: key,
        total: val.total,
        converted: val.converted,
        dropped: val.dropped,
        rate:
          val.total > 0
            ? parseFloat(((val.converted / val.total) * 100).toFixed(1))
            : 0,
      }));

    // Daily
    const dailyConversion = Object.entries(dailyMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, val]) => ({
        label: key,
        total: val.total,
        converted: val.converted,
        dropped: val.dropped,
        rate:
          val.total > 0
            ? parseFloat(((val.converted / val.total) * 100).toFixed(1))
            : 0,
      }));

    // Recent Activities -------------------------------------------------------------------------------------- /
    const recentActivities = await Activity.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();

    const formatedActivity = recentActivities.map((a) => ({
      id: a._id,
      user: a.assignedTo,
      action: a.title,
      time: new Date(a.createdAt).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    }));

    // Up comming reminders ------------------------------------------------------------------------------------ /
    const upcomingAppointments = await Appointments.find({
      start_time: { $gte: new Date() },
      status: "Scheduled",
    })
      .sort({ start_time: 1 })
      .limit(5)
      .lean();

    const upcomingReminders = upcomingAppointments.map((apt) => ({
      id: apt._id,
      title: apt.title,
      date: new Date(apt.start_time).toLocaleDateString("en-GB"),
      time: new Date(apt.start_time).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

    res.status(200).json({
      success: true,
      data: {
        totalLeads,
        totalContacts,
        totalActivities,
        totalAppointments,
        totalUsers,
        totalRevenue,

        summary: {
          pendingLeads,
          completedLeads,
          confirmedLeads,
          droppedLeads,
          conversionRate,
        },

        conversion: {
          monthly: monthlyConversion,
          weekly: weeklyConversion,
          daily: dailyConversion,
        },

        recentActivities: formatedActivity,
        upcomingReminders: upcomingReminders,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Failed to load dashboard data" });
  }
};

module.exports = { getDashboardData };
