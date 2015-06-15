# confess-top10
Based on Confess.js, a new option 'top10' is added to calculate slowest and largest page resources. Adjustments made to be mobile web friendly. 

Usage:
````phantomjs confess.js <URL to test> top10````

test.js is another phantomjs testing script, not yet using confess. It is implemented by a bash script test.sh to run page load tests on an array of URLs. Each URL is checked 10 times, and a csv called pageload-page{p#}.csv summarizes the times and sizes for that page. A CSV called resources-page{#}.csv lists the resources received for the last attempt at loading the page.


