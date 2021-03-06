/**
 * Created by Curso on 18/05/2017.
 */
export class GenericService {
    constructor() {

    }

  /*
        ajax(url, method, data)
        {
            return new Promise(function (resolve, reject) {
                var req = new XMLHttpRequest();
                req.open(method, url);
                req.onload = function () {
                    if (req.status === 200 || req.status === 201) {
                        resolve(req.response);
                    } else {
                        reject(new Error(req.statusText));
                    }
                };
                req.onerror = function () {
                    reject(new Error("Network error"));
                };
                req.send(data);
            });
        }
 */
         ajax(url, method, data, tipo)
         {
              return new Promise(function (resolve, reject) {
                $.ajax({
                    "url": url,
                    "data": data,

                    contentType: "application/json; charset=utf-8",
                    crossDomain: true,
                    dataType: tipo,
                    type: method
                }).done(function (data) {
                    resolve(data);
                }).fail(function (e) {
                    reject(e);
                    console.log(e);
                });
              });
         }



}
/*
* $.ajax({
*   url:"";
*   data:""
*   }).done(function(data)){
*   console.log(data);
* }).fail()
* .allways();
*
* */
