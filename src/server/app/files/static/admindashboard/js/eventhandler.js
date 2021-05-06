let dots = 4;
let sliderElem = document.querySelector('.slider')
let dotElems = sliderElem.querySelectorAll('.slider__dot')
let indicatorElem = sliderElem.querySelector('.slider__indicator')

Array.prototype.forEach.call(dotElems, (dotElem) => {

	dotElem.addEventListener('click', (e) => {

		let currentPos = parseInt(sliderElem.getAttribute('data-pos'))
		let newPos = parseInt(dotElem.getAttribute('data-pos'))

		let newDirection = (newPos > currentPos ? 'right' : 'left')
		let currentDirection = (newPos < currentPos ? 'right' : 'left')

		indicatorElem.classList.remove(`slider__indicator--${currentDirection}`)
		indicatorElem.classList.add(`slider__indicator--${newDirection}`)
		sliderElem.setAttribute('data-pos', newPos)

	})

})


function insertLastLoginFromCountryList(countries, requests) {
	$('.country-list-unique').empty();


	const countrySort = new Map([...Object.entries(countries)].sort((a, b) => b[1].users.length - a[1].users.length));
	var index = 0;
	countrySort.forEach((country) => {
		index++;
		$('.country-list-unique').append(
			`
			<div class="country-list-item">
				<p class="country-list-item-index">${index}.</p>
				<div class="country-list-flag" style="background-image: url('${country.flag}')"></div>
				<div class="country-list-name">${country.name}</div>
				<div class="country-list-total-requests">${country.users.length} Visitors</div>
				<div class="country-list-request-average">${Math.round(country.users.length / requests * 100)}% </div>
			</div>	
			`
		);
	})




}


function insertRequestFromCountry(countries, requests) {
	$('.country-list-requests').empty();


	const countrySort = new Map([...Object.entries(countries)].sort((a, b) => b[1].users.length - a[1].users.length));
	var index = 0;
	countrySort.forEach((country) => {
		index++;
		$('.country-list-requests').append(
			`
			<div class="country-list-item">
				<p class="country-list-item-index">${index}.</p>
				<div class="country-list-flag" style="background-image: url('${country.flag}')"></div>
				<div class="country-list-name">${country.name}</div>
				<div class="country-list-total-requests">${country.users.length} Visits</div>
				<div class="country-list-request-average">${Math.round(country.users.length / requests * 100)}% </div>
			</div>	
			`
		);
	})




}



let dots_country = 2;
let sliderElem_country = document.getElementsByClassName('slider_country')
let dotElems_country = document.getElementsByClassName('slider__dot_country')
let indicatorElem_country = document.getElementsByClassName('slider__indicator_country')



Array.prototype.forEach.call(dotElems_country, (dotElem_country) => {


	dotElem_country.addEventListener('click', (e) => {

		let currentPos_country_first = parseInt(sliderElem_country[0].getAttribute('data-pos'))
		let newPos_country_first = parseInt(dotElem_country.getAttribute('data-pos'))

		let newDirection_country_first = (newPos_country_first > currentPos_country_first ? 'right' : 'left')
		let currentDirection_country_first = (newPos_country_first < currentPos_country_first ? 'right' : 'left')

		indicatorElem_country[0].classList.remove(`slider__indicator__country--${currentDirection_country_first}`)
		indicatorElem_country[0].classList.add(`slider__indicator__country--${newDirection_country_first}`)
		sliderElem_country[0].setAttribute('data-pos', newPos_country_first)




		let currentPos_country_second = parseInt(sliderElem_country[1].getAttribute('data-pos'))
		let newPos_country_second = parseInt(dotElem_country.getAttribute('data-pos'))




		sliderElem_country[1].setAttribute('data-pos', newPos_country_second)

	})

})

/**
 * Datasheet Popup handler
 */


	$('body').on('click', '.dashboard-issues-inner-container-item', function() {

		const clickedIssue = $(this);

		sendRequestToServer({type: "POST", url: "/issues/getSpecificIssue", data: {id: clickedIssue.data('issueid')}}).then(data => {


			const date1 = new Date(data.res.submitted * 1000);
			const date2 = new Date();
			const diffTime = Math.abs(date2 - date1);
			const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1; 

			$("#feedbackSheet").addClass("feedbackSheetVisible");
			$("#feedbackSheet").data('issueId', data.res._id.$oid);
			$("#feedbackSheetTitle").text(data.res.issue.title);
			$("#feedbackSheetUser").text(data.res.u_id.name + " (" + data.res.u_id.mail + ")");
			$("#feedbackSheetCategory").text(data.res.issue.cat);
			$("#feedbackSheetDescription").text(data.res.issue.desc);
			$("#feedbackSheetStatus").text(data.res.status ? 'finished' : 'open');
			$("#feedbackSheetDate").text(new Date(data.res.submitted * 1000).toLocaleDateString() + " (" + diffDays + " days ago.)");

		 });
		/*
		$("#feedbackSheet").addClass("feedbackSheetVisible");
		$("#feedbackSheetTitle").text(this.dataset.title);
		$("#feedbackSheetUser").text(this.dataset.email);
		$("#feedbackSheetCategory").text(this.dataset.category);
		$("#feedbackSheetDescription").text(this.dataset.description);
		*/
	})

	
	$('.issue-finished').on('click', function() {
		const curIssue = $("#feedbackSheet").data('issueId');

		sendRequestToServer({type: "POST", url: "/issues/closeIssue", data: {id: curIssue}}).then(data => {
			$("#feedbackSheet").removeClass("feedbackSheetVisible");
			$("#feedbackSheet").addClass("feedbackSheetHidden");
			getReportedIssues();
		});

	})


document.getElementById('closeFeedbackSheet').addEventListener('click', function () {
	$("#feedbackSheet").removeClass("feedbackSheetVisible");
	$("#feedbackSheet").addClass("feedbackSheetHidden");
});


function insertIssues(issues) {
	$('.dashboard-issues-inner-container').empty();
	 var index = 0;
	issues.forEach((issue) => {
		index++;
		var d = new Date(issue.submitted * 1000)
		$('.dashboard-issues-inner-container').append(
			`
			<div class="dashboard-issues-inner-container-item" data-issueId="${issue._id.$oid}">
                <div class="dashboard-issues-inner-container-item-index">${index}.</div>
                <div class="dashboard-issues-inner-container-item-writer">${issue.u_id.name}</div>
                <div class="dashboard-issues-inner-container-item-title">${issue.issue.title}</div>
                <div class="dashboard-issues-inner-container-item-category">${issue.issue.cat}</div>
                <div class="dashboard-issues-inner-container-item-issue-date">${d.toLocaleDateString()}</div>
            </div>
			`
		);
	})
}