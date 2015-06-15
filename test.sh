#!/bin/bash 
PAGES=(http://m.thestar.com/#/article/news/canada/2015/06/12/rcmp-charge-man-in-journalist-amanda-lindhout-kidnapping.html http://m.thestar.com/#/article/news/canada/2015/06/12/licensed-pot-producers-are-wary-of-high-court-ruling-on-edible-marijuana.html 
http://m.thestar.com/#/article/life/2015/06/12/bike-month-riders-gush-on-why-they-love-their-wheels.html http://m.thestar.com/#/article/opinion/editorials/2015/06/11/toronto-deserves-clear-answers-on-carding-editorial.html http://m.thestar.com/#/article/news/world/2015/06/12/australia-pm-does-not-deny-navy-paid-traffickers-to-return-migrants-to-indonesian-waters.html http://m.thestar.com/#/section/opinion http://m.thestar.com/#/section/gta http://m.thestar.com/#/section/entertainment http://m.thestar.com/#/section/business http://m.thestar.com/#/section/latestnews)
COUNTER=0
ARTICLECOUNTER=1;
MAX=10

for i in ${PAGES[@]}; do
	COUNTER=0
	while [  $COUNTER -lt $MAX ]; do
		phantomjs test.js ${i} http://m.thestar.com
		let COUNTER=COUNTER+1 
	done

	cp pageload.csv pageload-page$ARTICLECOUNTER.csv
	cp resources.csv resources-page$ARTICLECOUNTER.csv
	rm pageload.csv
	rm resources.csv

	let ARTICLECOUNTER=ARTICLECOUNTER+1
done
