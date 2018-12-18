$(document).ready(function () {
    function getCards(rarity, cb) {
        $.get(`/cards/${rarity}`, function (data) {
            cb(data);
        });
    }

    function setTableData(rarity) {
        getCards(rarity, function (data) {
            $("#content").empty();
            data.forEach((card, index) => {
                let newRow = $("<tr>");
                const number = $(`<th scope="row">${index}</th>`);
                const title = $("<td>").text(card.title);
                const price = $("<td>").text(card.price);
                newRow.append(number, title, price);
                $("#content").append(newRow);
            })
        })
    }

    function setButtonColors(currentButtonSelected) {
        $(`button.btn.btn-success`).removeClass("btn-success");
        $(`button[data-rarity="${currentButtonSelected}"]`).addClass("btn-success");
    }

    $("button").on("click", function (e) {
        const thisRarity = e.target.dataset.rarity;
        setTableData(thisRarity);
        setButtonColors(thisRarity);
    })

    setTableData('common');
    setButtonColors('common');
    
});