$(document).ready(() => {
    $('#namo').click(() => {
        const id = $('#userid').val();
        $.ajax({
            url: `user/${id} `,
            method: 'GET',
            contentType: 'application/json',
            success: (response) => {
                const name = response.customer.name;
                const age = response.customer.age;
                const country = response.customer.country;
                $('#name').val(name);
                $('#age').val(age);
                $('#country').val(country);
            }
        });
    });

    $('#all').click(() => {
        $('table').css('display', 'block');
        $.ajax({
            url: '/user',
            method: 'GET',
            contentType: 'application/json',
            success: (response) => {
                var tbody = $('tbody');
                tbody.html('');
                response.customer.forEach(element => {
                    tbody.append(`<tr>\
                    <td class="id"> ${element._id} </td>\
                    <td> ${element.name} </td>\
                    <td> ${element.age} </td>\
                    <td> ${element.country} </td>\
                </tr> `);
                });
            }
        });
    });

    $('#bramha').click(() => {
        const name = $('#name').val();
        const age = $('#age').val();
        const country = $('#country').val();
        $.ajax({
            url: '/user',
            method: 'Post',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({ 'name': name, 'age': age, 'country': country }),
            success: (response) => {
                const res = JSON.stringify(response);
                const jp = JSON.parse(res);
                $('#lab5').text(jp.error);
            }
        });
    });

    $('#vishnu').click(() => {
        const name = $('#name').val();
        const age = $('#age').val();
        const country = $('#country').val();
        const id = $('#userid').val();
        $.ajax({
            url: `/user/${id}`,
            method: 'PUT',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({ 'name': name, 'age': age, 'country': country }),
            success: (response) => {
                const res = JSON.stringify(response);
                $('#lab5').text(res);
            }
        });
    });

    $('#asura').click(() => {
        const id = $('#userid').val();
        $.ajax({
            url: `user/${id} `,
            method: 'DELETE',
            contentType: 'application/json',
            success: (response) => {
                const res = JSON.stringify(response);
                $('#lab5').text(res);
            }
        });
    });

    $('#open').click(() => {
        $('#mySidenav').css('width', '210px');
    });

    $('#closebtn').click(() => {
        $('#mySidenav').css('width', '0px');
    });

});