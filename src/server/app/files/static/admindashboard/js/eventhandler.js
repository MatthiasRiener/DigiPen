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
	console.log(countrySort)
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
	console.log(countrySort)
	var index = 0;
	countrySort.forEach((country) => {
		index++;
		$('.country-list-requests').append(
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



let dots_country = 2;
let sliderElem_country = document.getElementsByClassName('slider_country')
let dotElems_country = document.getElementsByClassName('slider__dot_country')
let indicatorElem_country = document.getElementsByClassName('slider__indicator_country')

console.log(indicatorElem_country)


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
document.querySelectorAll('.openDataSheet').forEach(element => {
	element.addEventListener('click', function (e) {
		$("#feedbackSheet").addClass("feedbackSheetVisible");
		$("#feedbackSheetTitle").text(this.dataset.title);
		$("#feedbackSheetUser").text(this.dataset.email);
		$("#feedbackSheetCategory").text(this.dataset.category);
		$("#feedbackSheetDescription").text(this.dataset.description);
	});
});

document.getElementById('closeFeedbackSheet').addEventListener('click', function () {
	$("#feedbackSheet").removeClass("feedbackSheetVisible");
	$("#feedbackSheet").addClass("feedbackSheetHidden");
});