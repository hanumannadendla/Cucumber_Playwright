const report = require("multiple-cucumber-html-reporter");

report.generate({
    jsonDir: "test-results",
    reportPath: "test-results/reports/",
    reportName: "Playwright Automation Report",
    pageTitle: "Salesforce sales cloud",
    displayDuration: false,
    metadata: {
        browser: {
            name: "chrome",
        },
        device: "Hanuma - PC",
        platform: {
            name: "Windows",
        },
    },
    customData: {
        title: "Test Info",
        data: [
            { label: "Project", value: "Salesforce Sales Cloud" },
            { label: "Cycle", value: "Regression" }
        ],
    },
});