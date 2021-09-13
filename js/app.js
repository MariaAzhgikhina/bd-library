
$(document).ready(function () {

    var current_obj, search_obj, filter_obj, pdf_obj;
    var add_win = $('[data-remodal-id=add_win]').remodal();
    var view_object = $('[data-remodal-id=view_object]').remodal();
    var add_filter = $('[data-remodal-id=add_filter]').remodal();
    var add_otchet = $('[data-remodal-id=add_otchet]').remodal();
    var str, sorting = "0";

    var cancel = function () {
        $('#sort').children('option:not(:first)').remove();
    }
    $("#myselect").on('change', function () {
        $("select[name=tables] option:selected").each(function () {
            str = $(this).val();
        });
        $("#sort").on('change', function () {
            $("select[name=sort] option:selected").each(function () {
                //alert($(this).val());
                sorting = $(this).val();
                get_objects(str, sorting);
            });
        });
        get_objects(str, sorting);
        $("input").val('');
        cancel();
        if (str == 1) {
            $('#search').attr("placeholder", "title");
            $('#sort').append($("<option></option>").attr("value", "1").text("title"));
            $('#sort').append($("<option></option>").attr("value", "2").text("price"));
            $('#sort').append($("<option></option>").attr("value", "3").text("amount"));
        }
        if (str == 2) {
            $('#search').attr("placeholder", "lastname");
            $('#sort').append($("<option></option>").attr("value", "1").text("lastname"));
            $('#sort').append($("<option></option>").attr("value", "2").text("firstname"));
            $('#sort').append($("<option></option>").attr("value", "3").text("city"));
            $('#sort').append($("<option></option>").attr("value", "4").text("country"));
        }
        if (str == 3) {
            $('#search').attr("placeholder", "name of publisher");
            $('#sort').append($("<option></option>").attr("value", "1").text("name"));
            $('#sort').append($("<option></option>").attr("value", "2").text("city"));
            $('#sort').append($("<option></option>").attr("value", "3").text("country"));
        }
        if (str == 4) {
            $('#search').attr("placeholder", "name of type");
            $('#sort').append($("<option></option>").attr("value", "1").text("name"));
        }
        if (str == 5) {
            $('#search').attr("placeholder", "lastname");
            $('#sort').append($("<option></option>").attr("value", "1").text("lastname"));
            $('#sort').append($("<option></option>").attr("value", "2").text("firstname"));
        }
        if (str == 6) {
            $('#search').attr("placeholder", "date");
            $('#sort').append($("<option></option>").attr("value", "1").text("amount"));
            $('#sort').append($("<option></option>").attr("value", "2").text("date"));
        }

    })

    var get_objects = function (val, sorting) {
        var fd = new FormData();
        fd.append('val', val);
        fd.append('sorting', sorting);
        $.ajax({
            method: "POST",
            url: "../includes/get_objects.php",
            data: fd,
            processData: false,
            contentType: false
        }).done(function (data) {
            current_obj = $.parseJSON(data);
            draw_table(val);
            if (data === 'true') {
                $("#myselect").trigger('change');
                $("#sort").trigger('change');
            }
        });
        return false;
    }


    var add_object = function (form, val) {
        var fd = new FormData($(form)[0]);
        fd.append('val', val);
        $.ajax({
            method: "POST",
            url: "../includes/add_objects.php",
            data: fd,
            processData: false,
            contentType: false
        }).done(function (data) {
            $('.wrapper').trigger('added_object');
            if (data === 'true') {
                $("#myselect").trigger('change');
                $("#sort").trigger('change');
            }
        });
        return false;
    }

    //все в порядке
    var draw_table = function (val) {
        $('.object_list').html('');
        var object_list = '';
        if (val == 1) {
            object_list = '<tr><th>ID</th><th>title</th><th>author_id</th><th>type_id</th><th>price</th><th>publisher_id</th><th>amount</th></tr>';
            for (key in current_obj) {
                object_list += '<tr class="lc" data-remodal-target="view_object"><td>' + current_obj[key].id + '</td><td class="title">' + current_obj[key].title + '</td><td>'
                + current_obj[key].author_id + '</td><td>' + current_obj[key].type_id + '</td><td>' + current_obj[key].price
                + '</td><td>' + current_obj[key].publisher_id + '</td><td>' + current_obj[key].amount + '</td></tr>';
            }
        }
        if (val == 2) {
            object_list = '<tr><th>ID</th><th>lastname</th><th>firstname</th><th>description</th><th>city</th><th>country</th></tr>';
            for (key in current_obj) {
                object_list += '<tr class="lc" data-remodal-target="view_object"><td>' + current_obj[key].id + '</td><td>' + current_obj[key].lastname + '</td><td>'
                + current_obj[key].firstname + '</td><td>' + current_obj[key].description + '</td><td>' + current_obj[key].city
                + '</td><td>' + current_obj[key].country + '</td></tr>';
            }
        }
        if (val == 3) {
            object_list = '<tr><th>ID</th><th>name</th><th>city</th><th>country</th></tr>';
            for (key in current_obj) {
                object_list += '<tr class="lc" data-remodal-target="view_object"><td>' + current_obj[key].id + '</td><td>' + current_obj[key].name
                + '</td><td>' + current_obj[key].city + '</td><td>' + current_obj[key].country + '</td></tr>';
            }
        }
        if (val == 4) {
            object_list = '<tr><th>ID</th><th>name</th></tr>';
            for (key in current_obj) {
                object_list += '<tr class="lc" data-remodal-target="view_object"><td>' + current_obj[key].id + '</td><td>' + current_obj[key].name + '</td></tr>';
            }
        }
        if (val == 5) {
            object_list = '<tr><th>ID</th><th>lastname</th><th>firstname</th><th>email</th><th>phone</th></tr>';
            for (key in current_obj) {
                object_list += '<tr class="lc" data-remodal-target="view_object"><td>' + current_obj[key].id + '</td><td>' + current_obj[key].lastname + '</td><td>'
                + current_obj[key].firstname + '</td><td>' + current_obj[key].email + '</td><td>' + current_obj[key].phone + '</td></tr>';
            }
        }
        if (val == 6) {
            object_list = '<tr><th>ID</th><th>customer_id</th><th>book_id</th><th>amount</th><th>data_order</th></tr>';
            for (key in current_obj) {
                object_list += '<tr class="lc" data-remodal-target="view_object"><td>' + current_obj[key].id + '</td><td>' + current_obj[key].customer_id + '</td><td>'
                + current_obj[key].book_id + '</td><td>' + current_obj[key].amount + '</td><td>' + current_obj[key].data_order + '</td></tr>';
            }
        }
        $('.object_list').html(object_list);
    }


    //Add new string in table
    $('body').on('click', '.new_object', function () {
        var new_obj = '';
        if (str == 1) {
            new_obj = '<form method="post" enctype="multipart/form-data"><div><input name="title" type="text" placeholder="title"></div>'
        + '<div><input name="author_id" type="text" placeholder="author_id"></div>'
        + '<div><input name="type_id" type="text" placeholder="type_id"></div>'
        + '<div><input name="price" type="text" placeholder="price"></div>'
         + '<div><input name="publisher_id" type="text" placeholder="publisher_id"></div>'
         + '<div><input name="amount" type="text" placeholder="amount"></div></form>';
        }
        if (str == 2) {
            new_obj = '<form method="post" enctype="multipart/form-data"><div><input name="lastname" type="text" placeholder="lastname"></div>'
        + '<div><input name="firstname" type="text" placeholder="firstname"></div>'
        + '<div><input name="description" type="text" placeholder="description"></div>'
        + '<div><input name="city" type="text" placeholder="city"></div>'
         + '<div><input name="country" type="text" placeholder="country"></div></form>';
        }
        if (str == 3) {
            new_obj = '<form method="post" enctype="multipart/form-data"><div><input name="name" type="text" placeholder="name"></div>'
        + '<div><input name="city" type="text" placeholder="city"></div>'
        + '<div><input name="country" type="text" placeholder="country"></div></form>';
        }
        if (str == 4) {
            new_obj = '<form method="post" enctype="multipart/form-data"><div><input name="name" type="text" placeholder="name"></div></form>';
        }
        if (str == 5) {
            new_obj = '<form method="post" enctype="multipart/form-data"><div><input name="lastname" type="text" placeholder="lastname"></div>'
        + '<div><input name="firstname" type="text" placeholder="firstname"></div>'
        + '<div><input name="email" type="text" placeholder="email" ></div>'
         + '<div><input name="phone" type="text" placeholder="phone"></div></form>';
        }
        if (str == 6) {
            new_obj = '<form method="post" enctype="multipart/form-data"><div><input name="customer_id" type="text" placeholder="customer_id"></div>'
        + '<div><input name="book_id" type="text" placeholder="book_id"></div>'
        + '<div><input name="amount" type="text" placeholder="amount"></div>'
        + '<div><input name="data_order" type="text" placeholder="data_order"></div></form>';
        }
        $('.add_win form').trigger('reset');
        $('.add_obj_crits').html(new_obj);

    })

    var check_input = function () {
        var re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
        var tel = /^\d[\d\(\)\ -]{4,14}\d$/;
        var date = /\d{4}-\d{2}-^\d{2}/;
        if (str == "1") {
            if ($('.remodal-is-opened input[name=title]').val() == "" || $('.remodal-is-opened input[name=author_id]').val() == "" || $('.remodal-is-opened input[name=publisher_id]').val() == ""
                || $('.remodal-is-opened input[name=price]').val() == "" || $('.remodal-is-opened input[name=type_id]').val() == "" || $('.remodal-is-opened input[name=amount]').val() == "") {
                return false;
            }
            else return true;
        }
        if (str == "2") {
            if ($('.remodal-is-opened input[name=lastname]').val() == "" || $('.remodal-is-opened input[name=firstname]').val() == "" || $('.remodal-is-opened input[name=city]').val() == "" || $('.remodal-is-opened input[name=country]').val() == "") {
                return false;
            }
            else return true;
        }
        if (str == "3") {
            if ($('.remodal-is-opened input[name=name]').val() == "" || $('.remodal-is-opened input[name=city]').val() == "" || $('.remodal-is-opened input[name=country]').val() == "") {
                return false;
            }
            else return true;
        }
        if (str == "4") {
            if ($('.remodal-is-opened input[name=name]').val() == "") {
                return false;
            }
            else return true;
        }
        if (str == "5") {
            if ($('.remodal-is-opened input[name=lastname]').val() != "" && $('.remodal-is-opened input[name=firstname]').val() != "") {
                if ($('.remodal-is-opened input[name=email]').val() != "" && re.test($('.remodal-is-opened input[name=email]').val())) {
                    if ($('.remodal-is-opened input[name=phone]').val() == "") return true;
                    else if ($('.remodal-is-opened input[name=phone]').val() != "" && tel.test($('.remodal-is-opened input[name=phone]').val())) return true;
                    else return false;
                }
                else return false;
            } else return false;
        }

        if (str == "6") {
            if ($('.remodal-is-opened input[name=customer_id]').val() != "" || $('.remodal-is-opened input[name=book_id]').val() != "" || $('.remodal-is-opened input[name=amoount]').val() != "") {
                if ($('.remodal-is-opened input[name=data_order]').val() != "" && date.test($('.remodal-is-opened input[name=data_order]').val())) return true;
                else false;
            }
            else return false;
        }
    }
    

    $('body').on('click', '.add_win .button', function () {
        if (check_input()) {
            var form = $(this).parent().find('form');
            add_object(form, str);
            $(this).addClass('loading');
        }
    })

    $('.wrapper').on('added_object', function () {
        get_objects();
        add_win.close();
        $('.add_win .button').removeClass('loading');
        $('.add_win form').trigger('reset');
    });



    //edit string in table

    $('body').on('click', '.lc', function () {
        var edit_str = '';
        if (str == 1) {
            $('.view_object h1').html($(this).find('td:eq(0)').text());
            edit_str = '<div><label>' + 'Title' + ': </label><input type="text" name="title" data-crit="' + '1' + '" value="' + $(this).find('td:eq(1)').text() + '"></div>'
                      + '<div><label>' + 'Author_ID' + ': </label><input name="author_id" type="text" data-crit="' + '2' + '" value="' + $(this).find('td:eq(2)').text() + '"></div>'
                      + '<div><label>' + 'Type_ID' + ': </label><input name="type_id" type="text" data-crit="' + '3' + '" value="' + $(this).find('td:eq(3)').text() + '"></div>'
                      + '<div><label>' + 'Price' + ': </label><input name="price" type="text" data-crit="' + '4' + '" value="' + $(this).find('td:eq(4)').text() + '"></div>'
                      + '<div><label>' + 'Publisher_ID' + ': </label><input name="publisher_id" type="text" data-crit="' + '5' + '" value="' + $(this).find('td:eq(5)').text() + '"></div>'
                      + '<div><label>' + 'Amount' + ': </label><input name="amount" type="text" data-crit="' + '6' + '" value="' + $(this).find('td:eq(6)').text() + '"></div>';
        };
        if (str == 2) {
            $('.view_object h1').html($(this).find('td:eq(0)').text());
            edit_str = '<div><label>' + 'Lastname' + ': </label><input type="text" name="lastname" data-crit="' + '1' + '" value="' + $(this).find('td:eq(1)').text() + '"></div>'
                      + '<div><label>' + 'Firstname' + ': </label><input name="firstname" type="text" data-crit="' + '2' + '" value="' + $(this).find('td:eq(2)').text() + '"></div>'
                      + '<div><label>' + 'description' + ': </label><input name="description" type="text" data-crit="' + '3' + '" value="' + $(this).find('td:eq(3)').text() + '"></div>'
                      + '<div><label>' + 'City' + ': </label><input name="city" type="text" data-crit="' + '4' + '" value="' + $(this).find('td:eq(4)').text() + '"></div>'
                      + '<div><label>' + 'Country' + ': </label><input name="country" type="text" data-crit="' + '5' + '" value="' + $(this).find('td:eq(5)').text() + '"></div>';
        };
        if (str == 3) {
            $('.view_object h1').html($(this).find('td:eq(0)').text());
            edit_str = '<div><label>' + 'Name' + ': </label><input name="name" type="text"  data-crit="' + '1' + '" value="' + $(this).find('td:eq(1)').text() + '"></div>'
                      + '<div><label>' + 'City' + ': </label><input name="city" type="text" data-crit="' + '2' + '" value="' + $(this).find('td:eq(2)').text() + '"></div>'
                      + '<div><label>' + 'Country' + ': </label><input name="country" type="text" data-crit="' + '3' + '" value="' + $(this).find('td:eq(3)').text() + '"></div>';
        };
        if (str == 4) {
            $('.view_object h1').html($(this).find('td:eq(0)').text());
            edit_str = '<div><label>' + 'Name' + ': </label><input type="text" name="name" data-crit="' + '1' + '" value="' + $(this).find('td:eq(1)').text() + '"></div>';
        };
        if (str == 5) {
            $('.view_object h1').html($(this).find('td:eq(0)').text());
            edit_str = '<div><label>' + 'Lastname' + ': </label><input name="lastname" type="text"  data-crit="' + '1' + '" value="' + $(this).find('td:eq(1)').text() + '"></div>'
                      + '<div><label>' + 'Firstname' + ': </label><input name="firstname" type="text" data-crit="' + '2' + '" value="' + $(this).find('td:eq(2)').text() + '"></div>'
                      + '<div><label>' + 'Email' + ': </label><input name="email" type="text" data-crit="' + '3' + '" value="' + $(this).find('td:eq(3)').text() + '"></div>'
                      + '<div><label>' + 'Phone' + ': </label><input name="phone" type="text" data-crit="' + '4' + '" value="' + $(this).find('td:eq(4)').text() + '"></div>';
        };
        if (str == 6) {
            $('.view_object h1').html($(this).find('td:eq(0)').text());
            edit_str = '<div><label>' + 'Customer_id' + ': </label><input type="text" name="customer_id" data-crit="' + '1' + '" value="' + $(this).find('td:eq(1)').text() + '"></div>'
                      + '<div><label>' + 'Book_id' + ': </label><input name="book_id" type="text" data-crit="' + '2' + '" value="' + $(this).find('td:eq(2)').text() + '"></div>'
                      + '<div><label>' + 'Amount' + ': </label><input name="amount" type="text" data-crit="' + '3' + '" value="' + $(this).find('td:eq(3)').text() + '"></div>'
                      + '<div><label>' + 'Data_order' + ': </label><input name="data_order" type="text" data-crit="' + '4' + '" value="' + $(this).find('td:eq(4)').text() + '"></div>';
        };
        $('.edit_obj_crits').html(edit_str);
    });

    var edit_object = function (form, name, val) {
        var fd = new FormData($(form)[0]);
        fd.append('id', name);
        fd.append('val', val);
        $.ajax({
            method: "POST",
            url: "../includes/edit_objects.php",
            data: fd,
            processData: false,
            contentType: false
        }).done(function (data) {
            $('.wrapper').trigger('edited_object');
            if (data === 'true') {
                $("#myselect").trigger('change');
                $("#sort").trigger('change');
            }
        });
        return false;
    }

    $('.wrapper').on('edited_object', function () {
        get_objects();
        view_object.close();
    });

    $('body').on('click', '.view_object .button', function () {
        if (check_input()) {
            var form = $(this).parent().find('form');
            edit_object(form, $(this).parent().find('h1').text(), str);
        }
    })


    //Del objects

    var del_object = function (id, surl, val) {
        var fd = new FormData();
        fd.append('id', id);
        fd.append('val', val);
        $.ajax({
            method: "POST",
            url: surl,
            data: fd,
            processData: false,
            contentType: false
        }).done(function (data) {
            $('.wrapper').trigger('edited_object');
            if (data === 'true') {
                $("#myselect").trigger('change');
                $("#sort").trigger('change');
            }
        });
        return false;
    }

    $('body').on('click', '.del', function () {
        del_object($(this).parent().find('h1').text(), "../includes/del_object.php", str);
    })




    //Filter
    var add_filter_object = function (form, val) {
        var fd = new FormData($(form)[0]);
        fd.append('val', val);
        $.ajax({
            method: "POST",
            url: "../includes/filter.php",
            data: fd,
            processData: false,
            contentType: false
        }).done(function (data) {
            $('.wrapper').trigger('added_filter');
            filter_obj = $.parseJSON(data);
            draw_filter_table(val);
        });
        return false;
    }


    $('body').on('click', '.сrit_filter', function () {
        var new_obj = '';

        new_obj = '<div><p><input type="radio" name="gender" value="1">Задать диапазон цен:</p></div><div><label>Цена больше: </label><input name="pricesmall" type="text" disabled></div>'
        + '<div><label>Цена меньше: </label><input name="pricebig" type="text" disabled></div>';


        new_obj += '<div><p><input type="radio" name="gender" value="2">Задать страну автора:</p></div><div><label>Страна: </label><input name="f_country" type="text" disabled></div>';


        new_obj += '<div><p><input type="radio" name="gender" value="3">Задать издательство:</p></div><div><label>Издательство: </label><input name="f_publisher" type="text" disabled></div>';


        $('.add_filter_crits').html(new_obj);
        $('.add_filter form').trigger('reset');
    })

    var fil_false = function () {
        $("input[name='pricesmall']").prop('disabled', true);
        $("input[name='pricebig']").prop('disabled', true);
        $("input[name='f_country']").prop('disabled', true);
        $("input[name='f_publisher']").prop('disabled', true);
    }

    $('body').on('click', 'input[value=1]', function () {
        fil_false();
        $("input[name='pricesmall']").prop('disabled', false);
        $("input[name='pricebig']").prop('disabled', false);
    })
    $('body').on('click', 'input[value=2]', function () {
        fil_false();
        $("input[name='f_country']").prop('disabled', false);
    })
    $('body').on('click', 'input[value=3]', function () {
        fil_false();
        $("input[name='f_publisher']").prop('disabled', false);
    })

    $('body').on('click', '.add_filter .button', function () {

        if ($("input[name='pricebig']").val() == "" && $('input[type=radio]:checked').val() == "1") $("input[name='pricebig']").val("1000000000");
        var form = $(this).parent().find('form');
        add_filter_object(form, $('input[type=radio]:checked').val());
        $(this).addClass('loading');
    })



    var draw_filter_table = function (val) {
        $('.object_list').html('');
        var object_list = '';
        object_list = '<tr><th>author</th><th>title</th><th>price</th><th>publisher</th><th>country</th></tr>';
        for (key in filter_obj) {
            object_list += '<tr class="lc"><td>' + filter_obj[key].name_author + '</td><td class="title">' + filter_obj[key].title + '</td><td>'
                + filter_obj[key].price + '</td><td>' + filter_obj[key].name + '</td><td>' + filter_obj[key].country + '</td></tr>';
        }
        $('.object_list').html(object_list);
    }

    $('.wrapper').on('added_filter', function () {

        add_filter.close();
        $('.add_filter .button').removeClass('loading');
        $('.add_filter form').trigger('reset');
    });

    //Search
    var get_search_objects = function (surl, search, val, sort) {
        var fd = new FormData();
        fd.append('search', search);
        fd.append('val', val);
        fd.append('sort', sort);
        //fd.append('data', data);
        $.ajax({
            method: "POST",
            url: surl,
            data: fd,
            processData: false,
            contentType: false
        }).done(function (data) {
            search_obj = $.parseJSON(data);
            draw_search_table();
        });
    }



    var draw_search_table = function () {
        $('.object_list').html('');
        var object_list = '';
        if (str == 1) {
            object_list = '<tr><th>ID</th><th>title</th><th>author_id</th><th>type_id</th><th>price</th><th>publisher_id</th><th>amount</th></tr>';
            for (key in search_obj) {
                object_list += '<tr class="lc" data-remodal-target="view_object"><td>' + search_obj[key].id + '</td><td class="title">' + search_obj[key].title + '</td><td>'
                + search_obj[key].author_id + '</td><td>' + search_obj[key].type_id + '</td><td>' + search_obj[key].price
                + '</td><td>' + search_obj[key].publisher_id + '</td><td>' + search_obj[key].amount + '</td></tr>';
            }
        }
        if (str == 2) {
            object_list = '<tr><th>ID</th><th>lastname</th><th>firstname</th><th>description</th><th>city</th><th>country</th></tr>';
            for (key in search_obj) {
                object_list += '<tr class="lc" data-remodal-target="view_object"><td>' + search_obj[key].id + '</td><td>' + search_obj[key].lastname + '</td><td>'
                + search_obj[key].firstname + '</td><td>' + search_obj[key].description + '</td><td>' + search_obj[key].city
                + '</td><td>' + search_obj[key].country + '</td></tr>';
            }
        }
        if (str == 3) {
            object_list = '<tr><th>ID</th><th>name</th><th>city</th><th>country</th></tr>';
            for (key in search_obj) {
                object_list += '<tr class="lc" data-remodal-target="view_object"><td>' + search_obj[key].id + '</td><td>' + search_obj[key].name
                + '</td><td>' + search_obj[key].city + '</td><td>' + search_obj[key].country + '</td></tr>';
            }
        }
        if (str == 4) {
            object_list = '<tr><th>ID</th><th>name</th></tr>';
            for (key in search_obj) {
                object_list += '<tr class="lc" data-remodal-target="view_object"><td>' + search_obj[key].id + '</td><td>' + search_obj[key].name + '</td></tr>';
            }
        }
        if (str == 5) {
            object_list = '<tr><th>ID</th><th>lastname</th><th>firstname</th><th>email</th><th>phone</th></tr>';
            for (key in search_obj) {
                object_list += '<tr class="lc" data-remodal-target="view_object"><td>' + search_obj[key].id + '</td><td>' + search_obj[key].lastname + '</td><td>'
                + search_obj[key].firstname + '</td><td>' + search_obj[key].email + '</td><td>' + search_obj[key].phone + '</td></tr>';
            }
        }
        if (str == 6) {
            object_list = '<tr><th>ID</th><th>customer_id</th><th>book_id</th><th>amount</th><th>data_order</th></tr>';
            for (key in search_obj) {
                object_list += '<tr class="lc" data-remodal-target="view_object"><td>' + search_obj[key].id + '</td><td>' + search_obj[key].customer_id + '</td><td>'
                + search_obj[key].book_id + '</td><td>' + search_obj[key].amount + '</td><td>' + search_obj[key].data_order + '</td></tr>';
            }
        }
        $('.object_list').html(object_list);
    }

    $('body').on('click', '.src', function () {
        if ($("#search").val() != '') {
            get_search_objects("../includes/search_books.php", $("#search").val(), str, $("#sort :selected").text());
        }
    })




    //OTCHET
    var get_otchet = function (val, form) {
        var fd = new FormData($(form)[0]);
        fd.append('val', val);
        $.ajax({
            method: "POST",
            url: "../includes/otchet.php",
            data: fd,
            processData: false,
            contentType: false
        }).done(function (data) {
            $('.wrapper').trigger('added_otchet');
            pdf_obj = $.parseJSON(data);
            get_pdfpage(val);
            location.reload();
        });
        return false;
    }
    $('body').on('click', '.otchet', function () {
        var new_obj = '';
        new_obj = '<div><p><input type="radio" name="gender" value="1">Отчет по заказам пользователя</p></div><div class="otch"><label>Пользователь: </label><input name="user" type="text" placeholder="фамилия и имя" disabled></div>';
        new_obj += '<div><p><input type="radio" name="gender" value="2">Продажи издательства</p></div><div class="otch"><label>Издательство: </label><input name="publisher" type="text" placeholder="наименование" disabled></div>';
        new_obj += '<div><p><input type="radio" name="gender" value="3">Продажи на дату</p></div><div class="otch"><label>Дата: </label><input name="date" type="text" placeholder="ГГГГ-ММ-ДД" disabled></div>';

        $('.add_crit_otchet').html(new_obj);
        $('.add_otchet form').trigger('reset');
    })

    var otch_false = function () {
        $("input[name='user']").prop('disabled', true);
        $("input[name='date']").prop('disabled', true);
        $("input[name='publisher']").prop('disabled', true);
    }

    $('body').on('click', 'input[value=1]', function () {
        otch_false();
        $("input[name='user']").prop('disabled', false);
    })
    $('body').on('click', 'input[value=2]', function () {
        otch_false();
        $("input[name='publisher']").prop('disabled', false);
    })
    $('body').on('click', 'input[value=3]', function () {
        otch_false();
        $("input[name='date']").prop('disabled', false);
    })
    $('body').on('click', '.add_otchet .button', function () {
        var form = $('.add_otchet').parent().find('form');
        get_otchet($('input[type=radio]:checked').val(), form);
        $(this).addClass('loading');
    })


    var get_pdfpage = function (val) {

        if (val == 1) {
            var doc = new jsPDF('p', 'pt');
            var itogo = 0;

            var name_report = "";

            var columns = [
                { title: "Author", dataKey: "author" },
                { title: "Title", dataKey: "title" },
                { title: "Price", dataKey: "price" },
                { title: "Amount", dataKey: "amount" },
                { title: "Sum", dataKey: "sum" },
                { title: "Data of order", dataKey: "data_order" }
            ];

            var id = pdf_obj[0].id, str = "[", example;
            for (key = 0; key < pdf_obj.length; key++) {

                if (pdf_obj[key].id == id) {
                    str += JSON.stringify(pdf_obj[key]) + ",";
                    name_report = "Shopcart user " + pdf_obj[key].customername;
                    id = pdf_obj[key].id;
                    itogo += parseInt(pdf_obj[key].sum);
                    if (key == pdf_obj.length - 1) {
                        str = str.slice(0, -1);
                        str += "]";
                        example = JSON.parse(str);
                        doc.text(name_report, 40, doc.autoTableEndPosY() + 50);
                        doc.autoTable(columns, example,
                        {
                            startY: doc.autoTableEndPosY() + 60,
                            theme: 'grid'
                        });
                        doc.text("To pay: " + itogo, 40, doc.autoTableEndPosY() + 30);
                    }
                }
                else {
                    str = str.slice(0, -1);
                    str += "]";
                    example = JSON.parse(str);

                    doc.text(name_report, 40, doc.autoTableEndPosY() + 50);
                    doc.autoTable(columns, example,
                    {
                        startY: doc.autoTableEndPosY() + 60,
                        theme: 'grid'
                    });
                    doc.text("To pay: " + itogo, 40, doc.autoTableEndPosY() + 30);
                    itogo = 0;
                    str = "[";
                    id = pdf_obj[key].id;
                    key--;
                }
            }
        }
        if (val == 2) {
            var doc = new jsPDF('p', 'pt');
            var name_report = "Publisher's sales: " + pdf_obj[0].name;
            var columns = [
                { title: "Title", dataKey: "title" },
                { title: "Author", dataKey: "author" },
                { title: "Sales", dataKey: "amount" }
            ];
            doc.text(name_report, 40, doc.autoTableEndPosY() + 30);
            doc.autoTable(columns, pdf_obj,
            {
                startY: doc.autoTableEndPosY() + 40,
                theme: 'grid'
            });
        }
        if (val == 3) {
            var doc = new jsPDF('p', 'pt');
            var name_report = "Sales on date: " + pdf_obj[0].data_order;
            var columns = [
                { title: "Author", dataKey: "name_author" },
                { title: "Title", dataKey: "title" },
                { title: "Price", dataKey: "price" },
                { title: "Amount", dataKey: "amount" },
                { title: "Sum", dataKey: "sum" }
            ];
            doc.text(name_report, 40, doc.autoTableEndPosY() + 30);
            doc.autoTable(columns, pdf_obj,
            {
                startY: doc.autoTableEndPosY() + 40,
                theme: 'grid'
            });
        }
        doc.save('table.pdf');
    }
    $('.wrapper').on('added_otchet', function () {
        add_otchet.close();
        $('.add_otchet .button').removeClass('loading');
        $('.add_otchet form').trigger('reset');
    });
});