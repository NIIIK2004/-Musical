const showMore = document.querySelector('.tracks-main__more');
const itemsLength = document.querySelectorAll('.tracks-main__item').length;
const modalEditRelease = document.getElementById('modal-edit_release');
const modalDeleteRelease = document.getElementById('modal-delete_release');
const body = document.querySelector('.body');

const fullscreenButton = document.getElementById("fullscreen-container");
const maximizeIcon = document.querySelector("#fullscreen-container img");
const detailsTrack = document.querySelector(".details-track");

let curr_realise_id = -1;
let items = 6;

showMore.addEventListener('click', () => {
    items += 6;
    const array = Array.from(document.querySelector('.tracks-main__list').children);
    const visibleItems = array.slice(0, items);

    visibleItems.forEach(el => el.classList.add('is-visible'));
    if(visibleItems.length === itemsLength) {
        showMore.style.display = 'none';
    }
});

fullscreenButton.addEventListener("click", function (event) {
    event.preventDefault();
    if (maximizeIcon.src.includes("maximize-icon.svg")) {
        maximizeIcon.src = "../images/minimize-icon.svg";
        detailsTrack.classList.add("open");
        document.body.classList.add('body--active');
    } else {
        maximizeIcon.src = "../images/maximize-icon.svg";
        detailsTrack.classList.remove("open");
        document.body.classList.remove('body--active');
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const tabButtons = document.querySelectorAll(".details-track__btn");
    const tabContents = document.querySelectorAll(".details-track__tab");

    tabButtons[0].classList.add("active");
    tabContents[0].classList.add("active");

    tabButtons.forEach(function(button, index) {
        button.addEventListener("click", function() {
            tabButtons.forEach(function(btn) {
                btn.classList.remove("active");
            });
            tabContents.forEach(function(content) {
                content.classList.remove("active");
            });
            button.classList.add("active");
            tabContents[index].classList.add("active");
        });
    });
});

function modal_addRelease() {
    modal_RealiseOpen("Создание релиза");
    $("#release_name").val("")
    curr_realise_id = -1;
}

function modal_saveRelease() {
    let formData = new FormData();
    formData.append("name_release", $("#name-release").val());
    formData.append("price_release", $("#price-release").val());
    formData.append("price_release", $("#description-release").val());

    $.ajax({
        method: "POST",
        url: "/save/release",
        data: formData,
        processData: false,
        contentType: false,
    }).done(function () {
        modal_releaseClose();
        window.location.reload();
    });
}

function modal_EditRelease() {
    modal_RealiseOpen("Редактирование релиза");

    let release_id = $(event.target).closest("button").attr('data-cake-id');
    let release_name = $(event.target).closest("button").attr('data-cake-name');
    let release_price = $(event.target).closest("button").attr('data-cake-price');
    let release_description = $(event.target).closest("button").attr('data-cake-description');

    $("#name-release").val(release_name);
    $("#price-release").val(release_price);
    $("#description-release").val(release_description);

    let dataContent ={
        id: curr_realise_id,
        name: release_name,
        price: release_price,
        description: release_description,
    };

    curr_realise_id = release_id;
    $.ajax({
        method: "POST",
        url: "/edit/release?id=${curr_realise_id}",
        data: dataContent
    }).done(function () {
        modal_releaseClose();
        window.location.reload();
    });
}

function modal_RealiseOpen(titleText) {
    $("#edit_modal__title").html(titleText);
    body.classList.toggle('body--active');
    modalEditRelease.classList.toggle('modal--active');
}

function modal_releaseClose() {
    body.classList.remove('body--active');
    modalEditRelease.classList.remove('modal--active');
    curr_realise_id = -1;
    $("#name-release").val("");
    $("#price-release").val("");
    $("#description-release").val("");
    $(".modal").scrollTop(0);
}

function modal_DeleteRelease() {
    console.log("open")
    let release_id = $(event.target).closest("button").attr("data-cake-id");
    let release_name = $(event.target).closest("button").attr("data-cake-name");
    body.classList.toggle('body--active');
    modalDeleteRelease.classList.toggle('modal--active');
    curr_realise_id = release_id;
    $("#release_name-delete").html(release_name);
}

function modal_DeleteReleaseClose() {
    console.log("close")
    body.classList.remove('body--active');
    modalDeleteRelease.classList.remove('modal--active');
    curr_realise_id = -1;
}

function deleteRelease() {
    window.location.href = `/delete/${curr_realise_id}`;
}