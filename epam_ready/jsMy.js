"use strict"


$('#accept').on('click', function() {
    if ($('#accept').attr('type') === 'Add') {
        let name = $('#nameInput').val();
        let count = $('#countInput').val();
        let price = $('#priceInput').val();
        if ((name.length < 16) && name && price && count && (/\S+$/.test(name))) {
            let num = Math.floor(Math.random() * 1000);
            data.push({ name, count, price, num });
            createRow(num);
            updateRow({ name, count, price, num });
            clearFields();
        }
    }
})

$("#myTable").on('click', '.dbutton', function() {
    if (confirm("Удалить товар?")) {
        let id1 = $(this).attr('id');
        let numid = parseInt(id1);
        $(`#tr${numid}`).remove();
    }
})

$("#myTable").on('click', '.ebutton', function(event) {
    let id1 = $(this).attr('id');
    let numid = parseInt(id1);

    const currentItem = data.find(function(item) {
        return item.num == numid;
    })

    $('#nameInput').val(currentItem.name);
    $('#countInput').val(currentItem.count);
    $('#priceInput').val(currentItem.price.split(/[,$]/g).join(''));

    $('#accept').attr('rowId', numid);

    changeButtonType('Update')

})

$('#addNewButton').on('click', function() {
    changeButtonType('Add');
    clearFields();
})

$('#accept').on('click', function() {
    if ($('#accept').attr('type') === 'Update') {
        const options = {
            num: $('#accept').attr('rowId'),
            name: $('#nameInput').val(),
            count: $('#countInput').val(),
            price: $('#priceInput').val(),
        }
        if ((options.name.length < 16) && options.name && options.price && options.count && (/\S+$/.test(options.name))) {
            data = data.map(function(item) {
                if ($('#accept').attr('rowId') == item.num) {
                    return options
                }

                return item;
            })
            $(`#tr${options.num}`).remove()
            createRow(options.num)
            updateRow(options)
            
        }
    }
})
 
$("#myTable").on('click', '#sortName1', function() {

    data = data.sort(function(a, b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
        }
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
        }
        return 0;
    });
    data.forEach(function(item) {
        $(`#tr${item.num}`).remove();
    });
    data.forEach(function(item) {
        createRow(item.num)
        updateRow(item)
    });
    $(this).attr('class', 'sortButtonRevers');
    $(this).attr('id', 'sortName2');


})

$("#myTable").on('click', '#sortName1', function() {

    data = data.sort(function(a, b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
        }
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
        }
        return 0;
    });
    data.forEach(function(item) {
        $(`#tr${item.num}`).remove();
    });
    data.forEach(function(item) {
        createRow(item.num)
        updateRow(item)
    });
    $(this).attr('class', 'sortButtonRevers');
    $(this).attr('id', 'sortName2');


})

$("#myTable").on('click', '#sortName2', function() {
    data = data.sort(function(a, b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
        }
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
        }
        return 0;
    });
    data = data.reverse();
    data.forEach(function(item) {
        $(`#tr${item.num}`).remove();
    });
    data.forEach(function(item) {
        createRow(item.num)
        updateRow(item)
    });
    $(this).attr('class', 'sortButton');
    $(this).attr('id', 'sortName1');

})

$("#myTable").on('click', '#sortPrice1', function() {

    data = data.sort((a, b) => a.price - b.price);
    data.forEach(function(item) {
        $(`#tr${item.num}`).remove();
    });
    data.forEach(function(item) {
        createRow(item.num)
        updateRow(item)
    });
    $(this).attr('class', 'sortButtonRevers');
    $(this).attr('id', 'sortPrice2');
})

$("#myTable").on('click', '#sortPrice2', function() {

    data = data.sort((a, b) => a.price - b.price);
    data = data.reverse();
    data.forEach(function(item) {
        $(`#tr${item.num}`).remove();
    });
    data.forEach(function(item) {
        createRow(item.num)
        updateRow(item)
    });
    $(this).attr('class', 'sortButton');
    $(this).attr('id', 'sortPrice1');
})
$('#searchButton').on('click', function() {
    let str = $('#searchIn').val()
    data.forEach(function(item) {
        $(`#tr${item.num}`).removeClass('hidden')
    })
    if (str && (/\S+$/.test(str))) {
        data.forEach(function(item) {

            if (item.name.indexOf(str) < 0) {
                $(`#tr${item.num}`).addClass('hidden')
            }
        })

    } else {
        data.forEach(function(item) {
            $(`#tr${item.num}`).removeClass('hidden')
        })
        $('#searchIn').val('')
    }

})
