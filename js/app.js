const loadPhone = async (searchKey, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchKey}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit);
}

const displayPhone = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText = '';

    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        showAll.classList.remove('d-none')
        // Display limited phones
        phones = phones.slice(0, 10);
    } else {
        showAll.classList.add('d-none')
    }
    // Display no matching found Messsege
    if (phones.length === 0) {
        document.getElementById('no-results').innerHTML = `
        <div>
                <h5 class="text-warning text-center p-5">No result found. <br>
                    Please try another keyword.</h5>
            </div>
            `;
    } else {

        document.getElementById('no-results').innerHTML = '';
    }
    // console.log(phones)
    phones.forEach(phone => {

        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
        <img class="img-fluid" src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                to additional content. This content is a little bit longer.</p>
                <a href="#" class="btn btn-primary" onclick="loadPhoneDetails('${phone.slug}')"data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</a>
        </div>
        `;

        phoneContainer.appendChild(phoneDiv);


    });
    toggleSpinner(false);
}
//Process Search
const processSearch = (dataLimit) => {
    const searchKey = document.getElementById('search-field').value;
    loadPhone(searchKey, dataLimit);
    toggleSpinner(true);
}
document.getElementById('search-btn').addEventListener('click', function () {
    processSearch(10);
})

document.getElementById('search-field').addEventListener("keypress", function (event) {
    if (event.key === "Enter") {

        processSearch(10);
    }
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader-section');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    } else {
        loaderSection.classList.add('d-none');
    }
}

document.getElementById('show-all-btn').addEventListener('click', function () {
    processSearch();
})

// Show phone details
const loadPhoneDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    showPhoneDetails(data.data);
    console.log(data.data)

}
const showPhoneDetails = phone => {
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;

    document.getElementById('phone-details').innerHTML = `
    <p>Realse Date:${phone.mainFeatures.releaseDate}</p>
    <p>Chipset:${phone.mainFeatures.chipSet}</p>
    
    `

}
loadPhone(10);