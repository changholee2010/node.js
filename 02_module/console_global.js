const company = {
  name: "Tech Innovators", // Depth 0
  department: {
    engineering: {
      webTeam: {
        project: {
          name: "Global Dashboard",
          lead: {
            name: "Alice",
            skills: ["React", "Node.js", "D3.js"],
          },
        },
      },
    },
  },
};
console.dir(company, { depth: 3, colors: true });

console.time("for loop");
for (let i = 1; i <= 10000; i++) {
  console.log(i);
}
console.timeEnd("for loop");
