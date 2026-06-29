const bcrypt = require("bcryptjs");

const hash = async () => {
  const p1 = await bcrypt.hash("Shaveen@123", 10);
  const p2 = await bcrypt.hash("Manager@123", 10);
  const p3 = await bcrypt.hash("Staff@123", 10);
  const p4 = await bcrypt.hash("Staff@123", 10);
  console.log("Super Admin:", p1);
  console.log("Manager:", p2);
  console.log("Staff 1:", p3);
  console.log("Staff 2:", p4);
};

hash();


// db.users.insertMany([
//   {
//     name: "Shaveen Kumar",
//     email: "shaveen@crm.com",
//     password: "$2b$10$9p5xIRxSsqzZ.x3B5Bd/Su0iH2nBez2u5NdLvSwsv6.jNpKPPdj82",
//     phone: "+91 9876543210",
//     role: "Super Admin",
//     department: "Management",
//     status: "Active",
//     access: ["Dashboard", "Leads", "Contacts", "Activity", "Appointments", "Users"],
//     lastLogin: new Date("2026-06-23"),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     name: "Priya Sharma",
//     email: "priya@crm.com",
//     password: "$2b$10$iHq/kQqbLNA2Ety3ETe4BeIDcBMz7x.78dgnKB9sHTjxpRH7/3g.m",
//     phone: "+91 9876543211",
//     role: "Manager",
//     department: "Sales",
//     status: "Active",
//     access: ["Dashboard", "Leads", "Contacts", "Activity"],
//     lastLogin: new Date("2026-06-23"),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     name: "Rahul Verma",
//     email: "rahul@crm.com",
//     password: "$2b$10$0/LgPSsOQnM6FRBZwpSP6uNHpj7IJabaKkB/VU00GQcK49pHh1L7O",
//     phone: "+91 9876543212",
//     role: "Staff",
//     department: "Sales",
//     status: "Active",
//     access: ["Dashboard", "Leads", "Contacts"],
//     lastLogin: new Date("2026-06-23"),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     name: "Ananya Raj",
//     email: "ananya@crm.com",
//     password: "$2b$10$aHbgj0r6KVWOYbU1pJxfieiawSHuYG15jY2njCuyX5iMJ/Mzvm5ki",
//     phone: "+91 9876543213",
//     role: "Receptionist",
//     department: "Operations",
//     status: "Active",
//     access: ["Dashboard", "Appointments"],
//     lastLogin: new Date("2026-06-23"),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// ]);