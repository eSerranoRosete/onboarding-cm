// add-component.js
const { execSync } = require("child_process");
const componentName = process.argv[2];

if (!componentName) {
  console.error("Please provide a component name");
  process.exit(1);
}

try {
  execSync(`npx shadcn-ui@latest add ${componentName}`, { stdio: "inherit" });
} catch (error) {
  console.error("Error adding component:", error.message);
  process.exit(1);
}
