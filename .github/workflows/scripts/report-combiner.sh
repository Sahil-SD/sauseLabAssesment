#!/bin/bash

mkdir -p ./test-report/combined-pages

# Copy Playwright report if it exists
if [ -d "./test-report/playwright-report" ]; then
  cp -r ./test-report/playwright-report ./test-report/combined-pages/playwright
fi

# Copy Allure report if it exists
if [ -d "./test-report/allure-report" ]; then
  cp -r ./test-report/allure-report ./test-report/combined-pages/allure
fi

# Copy your separate HTML index template to the root of the staging folder
cp -r .github/workflows/report-util/* ./test-report/combined-pages/

echo "Combined report generated at ./test-report/combined-pages"
ls -lrt ./test-report/combined-pages