
class incomeModel {
    constructor(kategori, miktar, tarih) {
        this.kategori = kategori;
        this.miktar = miktar;
        this.tarih = tarih;
    }
}



class expenseModel {
    constructor(kategori, miktar, tarih) {
        this.kategori = kategori;
        this.miktar = miktar;
        this.tarih = tarih;
    }
}


var incomeListmethod = function () { };
var incomeAddPagemethod = function () { };
var incomeSavemethod = function () { };
var incomeEditmethod = function (params) { };
var incomeDeletemethod = function (params) { };

var expenseListmethod = function () { };
var expenseEditmethod = function (params) { };
var expenseDeletemethod = function (params) { };
var expenseAddPagemethod = function () { };
var expenseSavemethod = function () { };

var reportmethod = function () { };
var reportGraph = function () { };

var income = new incomeModel("asdasdasdasdasd", 44654, Date(Date.now()))
var expense = new expenseModel("kkkkkkkkkkkk", 44654, Date(Date.now()))

var incomeupdateObj;
var expenseupdateObj;
var table = "";
var incomeList;
var expenseList;

//////////////GELİR METHOD//////////////////////

//Gelir Listesi
incomeListmethod = function () {
    // var descriptionBoard = document.getElementById("descriptionBoard");
    // descriptionBoard.innerHTML = income.kategori
    table = "";

    var settings = {
        "url": "http://localhost:3000/api/income/List",
        "method": "GET",
        "timeout": 0,
    };



    $.ajax(settings).done(function (response) {
        incomeList = response;
        // console.log(incomeList['data'][0]);
        // console.log(incomeList['data'].length);


        for (let index = 0; index < incomeList['data'].length; index++) {

            var x =
                '<tr>\n' +
                '                    <th scope="row">' + (parseInt(index + 1)).toString() + '</th>\n' +
                '                    <td>' + incomeList['data'][index].kategori + '</td>\n' +
                '                    <td>' + incomeList['data'][index].miktar + '</td>\n' +
                '                    <td>' + incomeList['data'][index].tarih + '</td>\n' +
                '                    <td>' + incomeList['data'][index].updatedAt + '</td>\n' +
                '                    <td style="text-align: right; ">\n' +
                '                        <button type="button" class="btn btn-primary" value="' + incomeList['data'][index]._id + '"  onclick="incomeEditmethod(value)">Düzenle</button>\n' +
                '                        <button type="button" class="btn btn-danger" value="' + incomeList['data'][index]._id + '"  onclick="incomeDeletemethod(value)">Sil</button>\n' +
                '                    </td>\n' +
                '                  </tr>';

            table += x;

        }

        var tableContent = '   <table class="table">  \n' +
            '                      <thead>  \n' +
            '                          <tr>  \n' +
            '                              <th scope="col">#</th>  \n' +
            '                              <th scope="col">Kategori</th>  \n' +
            '                              <th scope="col">Miktar</th>  \n' +
            '                              <th scope="col">Kayıt Tarihi</th>  \n' +
            '                              <th scope="col">Güncellenme Tarihi</th>  \n' +
            '                              <th style="text-align: right; " scope="col">İşlem</th>  \n' +
            '                          </tr>  \n' +
            '                      </thead>  \n' +
            '                      <tbody id="rowContent">  \n' +
            '    \n' + table +
            '                      </tbody>  \n' +
            '                  </table>  ';

        var descriptionBoard = document.getElementById('descriptionBoard');
        var incomelistAmount = document.getElementById("incomelistAmount");
        incomelistAmount.innerHTML = incomeList['data'].length;

        descriptionBoard.innerHTML = tableContent;


        table = null;
        console.log(incomeList);



    });

}


//Gelir düzenlemek için. İçinde tek bir gelire istek de var
incomeEditmethod = function (params) {
    var incomeGet;
    var descriptionBoard = document.getElementById('descriptionBoard');
    descriptionBoard.innerHTML = '';


    var settings = {
        "url": "http://localhost:3000/api/income/incomeGet/" + params,
        "method": "POST",
        "timeout": 0,
    };


    $.ajax(settings).done(function (response) {
        incomeGet = response;
        // console.log(incomeGet['data']);

        var content = '         <div class="container-fluid">  \n' +
            '                         <div style="margin: 15px;" class="row col col-sm-12">  \n' +
            '                                \n' +
            '                              <div class="">  \n' +
            '                                  <input id="inputCategoryName" class="form-control form-control-sm" type="text"  placeholder="' + incomeGet['data'].kategori + '"  \n' +
            '                                  aria-label=".form-control-sm example">  \n' +
            '                              </div>  \n' +
            '                              <div class="">  \n' +
            '                                  <input id="inputAmount" class="form-control form-control-sm" type="text"  placeholder="' + incomeGet['data'].miktar + '"  \n' +
            '                                  aria-label=".form-control-sm example">  \n' +
            '                              </div>  \n' +
            '                              <div class="">  \n' +
            '                                  <input id="inputDate" class="form-control form-control-sm" type="text"  placeholder="' + incomeGet['data'].tarih + '"  \n' +
            '                                  aria-label=".form-control-sm example">  \n' +
            '                              </div>  \n' +
            '                                \n' +
            '    \n' +
            '                              <div class="" style="text-align: center; margin: 15px;">  \n' +
            '                                  <button id="updateButton" type="button" class="btn btn-danger" value=""  onclick="">Güncelle</button>  \n' +
            '                              </div>    \n' +
            '                                \n' +
            '                      </div>  \n' +
            '    \n' +
            '    \n' +
            '              </div>  ';

        descriptionBoard.innerHTML = content;

        document.getElementById("updateButton").addEventListener("click", function () {
            incomeupdateObj = {
                kategori: document.getElementById("inputCategoryName").value,
                miktar: parseInt(document.getElementById("inputAmount").value),

            }

            var setting = {
                "method": "POST",
                "url": "http://localhost:3000/api/income/Update/" + params,
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/json",


                    // 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                "data": JSON.stringify({
                    "kategori": incomeupdateObj.kategori,
                    "miktar": incomeupdateObj.miktar
                }),
            };

            $.ajax(setting).done(function (response) {
                console.log(response);
                incomeListmethod();
            });

        })



    });




}

//Gelir sil.
incomeDeletemethod = function (params) {

    try {
        var settings = {
            "url": "http://localhost:3000/api/income/Delete/" + params,
            "method": "POST",
            "timeout": 0,
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            incomeListmethod();
        });
    } catch (error) {
        console.log("Hata" + error);
    }



    // console.log(params);

}

//Gelir Kaydetmek için kayıt formunun oluşturulduğu method.
incomeAddPagemethod = function () {

    var descriptionBoard = document.getElementById("descriptionBoard");



    var content = '         <div class="container-fluid">  \n' +
        '                         <div style="margin: 15px;" class="row col col-sm-12">  \n' +
        '                                \n' +
        '                              <div class="">  \n' +
        '                                  <input id="inputCategoryName" class="form-control form-control-sm" type="text"  placeholder="' + "Gelir Kategori" + '"  \n' +
        '                                  aria-label=".form-control-sm example">  \n' +
        '                              </div>  \n' +
        '                              <div class="">  \n' +
        '                                  <input id="inputAmount" class="form-control form-control-sm" type="text"  placeholder="' + "Gelir Miktarı" + '"  \n' +
        '                                  aria-label=".form-control-sm example">  \n' +
        '                              </div>  \n' +
        '                               \n' +
        '                                \n' +
        '    \n' +
        '                              <div class="" style="text-align: center; margin: 15px;">  \n' +
        '                                  <button id="saveButton" type="button" class="btn btn-danger" value=""  onclick="incomeSavemethod()">Kaydet</button>  \n' +
        '                              </div>    \n' +
        '                                \n' +
        '                      </div>  \n' +
        '    \n' +
        '    \n' +
        '              </div>  ';


    descriptionBoard.innerHTML = content;



};

//Gelir Kayıt API isteği
incomeSavemethod = function () {

    var obj = {
        cat: document.getElementById("inputCategoryName").value,
        amount: parseInt(document.getElementById("inputAmount").value),
    }

    var settings = {
        "url": "http://localhost:3000/api/income/Add",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "kategori": obj.cat,
            "miktar": obj.amount
        }),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        incomeListmethod();
    });

}



//////////////GİDER METHOD//////////////////////

//Gider  Listesi
expenseListmethod = function () {
    table = "";

    var settings = {
        "url": "http://localhost:3000/api/expense/List",
        "method": "GET",
        "timeout": 0,
    };



    $.ajax(settings).done(function (response) {
        expenseList = response;
        // console.log(incomeList['data'][0]);
        // console.log(incomeList['data'].length);

        for (let index = 0; index < expenseList['data'].length; index++) {

            var x =
                '<tr>\n' +
                '                    <th scope="row">' + (parseInt(index + 1)).toString() + '</th>\n' +
                '                    <td>' + expenseList['data'][index].kategori + '</td>\n' +
                '                    <td>' + expenseList['data'][index].miktar + '</td>\n' +
                '                    <td>' + expenseList['data'][index].tarih + '</td>\n' +
                '                    <td>' + expenseList['data'][index].updatedAt + '</td>\n' +
                
                '                    <td style="text-align: right; ">\n' +
                '                        <button type="button" class="btn btn-primary" value="' + expenseList['data'][index]._id + '"  onclick="expenseEditmethod(value)">Düzenle</button>\n' +
                '                        <button type="button" class="btn btn-danger" value="' + expenseList['data'][index]._id + '"  onclick="expenseDeletemethod(value)">Sil</button>\n' +
                '                    </td>\n' +
                '                  </tr>';

            table += x;

        }

        var tableContent = '   <table class="table">  \n' +
            '                      <thead>  \n' +
            '                          <tr>  \n' +
            '                              <th scope="col">#</th>  \n' +
            '                              <th scope="col">Kategori</th>  \n' +
            '                              <th scope="col">Miktar</th>  \n' +
            '                              <th scope="col">Kayıt Tarihi</th>  \n' +
            '                              <th scope="col">Güncellenme Tarihi</th>  \n' +
            '                              <th style="text-align: right; " scope="col">İşlem</th>  \n' +
            '                          </tr>  \n' +
            '                      </thead>  \n' +
            '                      <tbody id="rowContent">  \n' +
            '    \n' + table +
            '                      </tbody>  \n' +
            '                  </table>  ';

        var descriptionBoard = document.getElementById('descriptionBoard');
        descriptionBoard.innerHTML = tableContent;
        var expenselistAmount = document.getElementById("expenselistAmount");
        expenselistAmount.innerHTML = expenseList['data'].length;
        table = null;
        console.log(expenseList);

    });

};

//Gider düzenlemek için. İçinde tek bir gidere istek de var
expenseEditmethod = function (params) {
    var expenseGet;
    var descriptionBoard = document.getElementById('descriptionBoard');
    descriptionBoard.innerHTML = '';


    var settings = {
        "url": "http://localhost:3000/api/expense/expenseGet/" + params,
        "method": "POST",
        "timeout": 0,
    };


    $.ajax(settings).done(function (response) {
        expenseGet = response;
        // console.log(incomeGet['data']);

        var content = '         <div class="container-fluid">  \n' +
            '                         <div style="margin: 15px;" class="row col col-sm-12">  \n' +
            '                                \n' +
            '                              <div class="">  \n' +
            '                                  <input id="inputCategoryName" class="form-control form-control-sm" type="text"  placeholder="' + expenseGet['data'].kategori + '"  \n' +
            '                                  aria-label=".form-control-sm example">  \n' +
            '                              </div>  \n' +
            '                              <div class="">  \n' +
            '                                  <input id="inputAmount" class="form-control form-control-sm" type="text"  placeholder="' + expenseGet['data'].miktar + '"  \n' +
            '                                  aria-label=".form-control-sm example">  \n' +
            '                              </div>  \n' +
            '                              <div class="">  \n' +
            '                                  <input id="inputDate" class="form-control form-control-sm" type="text"  placeholder="' + expenseGet['data'].tarih + '"  \n' +
            '                                  aria-label=".form-control-sm example">  \n' +
            '                              </div>  \n' +
            '                                \n' +
            '    \n' +
            '                              <div class="" style="text-align: center; margin: 15px;">  \n' +
            '                                  <button id="updateButton" type="button" class="btn btn-danger" value=""  onclick="">Güncelle</button>  \n' +
            '                              </div>    \n' +
            '                                \n' +
            '                      </div>  \n' +
            '    \n' +
            '    \n' +
            '              </div>  ';

        descriptionBoard.innerHTML = content;

        document.getElementById("updateButton").addEventListener("click", function () {
            expenseupdateObj = {
                kategori: document.getElementById("inputCategoryName").value,
                miktar: parseInt(document.getElementById("inputAmount").value),

            }

            var setting = {
                "method": "POST",
                "url": "http://localhost:3000/api/expense/Update/" + params,
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/json",


                    // 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                "data": JSON.stringify({
                    "kategori": expenseupdateObj.kategori,
                    "miktar": expenseupdateObj.miktar
                }),
            };

            $.ajax(setting).done(function (response) {
                console.log(response);
                expenseListmethod();
            });

        })



    });


}

//Gelir sil.
expenseDeletemethod = function (params) {
    console.log(params);
}

//Gider Kaydetmek için kayıt formunun sayfaya oluşturulduğu method.
expenseAddPagemethod = function () {
    var descriptionBoard = document.getElementById("descriptionBoard");



    var content = '         <div class="container-fluid">  \n' +
        '                         <div style="margin: 15px;" class="row col col-sm-12">  \n' +
        '                                \n' +
        '                              <div class="">  \n' +
        '                                  <input id="inputCategoryName" class="form-control form-control-sm" type="text"  placeholder="' + "Gider Kategori" + '"  \n' +
        '                                  aria-label=".form-control-sm example">  \n' +
        '                              </div>  \n' +
        '                              <div class="">  \n' +
        '                                  <input id="inputAmount" class="form-control form-control-sm" type="text"  placeholder="' + "Gider Miktarı" + '"  \n' +
        '                                  aria-label=".form-control-sm example">  \n' +
        '                              </div>  \n' +
        '                               \n' +
        '                                \n' +
        '    \n' +
        '                              <div class="" style="text-align: center; margin: 15px;">  \n' +
        '                                  <button id="saveButton" type="button" class="btn btn-danger" value=""  onclick="expenseSavemethod()">Kaydet</button>  \n' +
        '                              </div>    \n' +
        '                                \n' +
        '                      </div>  \n' +
        '    \n' +
        '    \n' +
        '              </div>  ';


    descriptionBoard.innerHTML = content;
}

//Gider Kayıt API isteği
expenseSavemethod = function () {
    var obj = {
        cat: document.getElementById("inputCategoryName").value,
        amount: parseInt(document.getElementById("inputAmount").value),
    }

    var settings = {
        "url": "http://localhost:3000/api/expense/Add",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "kategori": obj.cat,
            "miktar": obj.amount
        }),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        expenseListmethod();
    });
}


reportmethod = function () {

    var descriptionBoard = document.getElementById("descriptionBoard");
    var res = {
        incomeTotal: "",
        expenseTotal: "",
        different: ""

    }





    var settings = {
        "url": "http://localhost:3000/api/report",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        res.incomeTotal = response['Gelir Toplam'];
        res.expenseTotal = response['Gider Toplam'];
        res.different = response['Fark'];



        var report = '<br> <br>\n' +
            '\n' +
            '                <table class="table">\n' +
            '                    <tr class="table">\n' +
            '                        <td class="table-success">Gelir Toplam:</td>\n' +
            '                        <td class="table-success">' + res.incomeTotal + '</td>\n' +
            '                    </tr>\n' +
            '                    <tr class="table">\n' +
            '                        <td class="table-danger">Gider Toplam:</td>\n' +
            '                        <td class="table-danger">' + res.expenseTotal + '</td>\n' +
            '                    </tr> \n' +
            '\n' +
            '                   <tr class="table">\n' +
            '                        <td class="table-info">Fark:</td>\n' +
            '                        <td class="table-info">' + res.different + '</td>\n' +
            '                    </tr>\n' +
            '\n' +
            '\n' +
            '                </table>\n' +
            '\n' +'<div class="d-grid gap-2">\n' +
            '\n' + '<button onclick="reportGraph()" id="graphButton" class="btn btn-primary btn-block ">Grafikler</button></div>\n' +
            '\n' + '</br></br>\n' +
            ' <canvas  id="myChart" ></canvas></br> </br>\n' +
            ' <canvas  id="myChartExpense"></canvas>\n' 
            
            ;

        descriptionBoard.innerHTML = report





    });

}

reportGraph = function () {
    document.getElementById("graphButton").hidden = true;

    var settings = {
        "url": "http://localhost:3000/api/income/List",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        incomeList = response;
        var catAr = [];
        var amountAr = [];
        var ctx = null;
        ctx = document.getElementById('myChart');

        for (let index = 0; index < incomeList['data'].length; index++) {

            catAr.push(incomeList['data'][index].kategori);
            amountAr.push(incomeList['data'][index].miktar);
        }

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: catAr,
                datasets: [{
                    label: 'Gelir Grafiği',
                    data: amountAr,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });






    var settings = {
        "url": "http://localhost:3000/api/expense/List",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        expenseList = response;
        var catAr = [];
        var amountAr = [];
        var ctx = null;
        ctx = document.getElementById('myChartExpense');

        for (let index = 0; index < expenseList['data'].length; index++) {

            catAr.push(expenseList['data'][index].kategori);
            amountAr.push(expenseList['data'][index].miktar);
        }

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: catAr,
                datasets: [{
                    label: 'Gider Grafiği',
                    data: amountAr,
                    borderWidth: 1,
                    
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });






}





