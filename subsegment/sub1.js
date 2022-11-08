const express = require('express');
const app = express.Router();


app.get('/region', getRegions);
app.get('/region/region:id', getRegionID);
app.get('/region/region:id/province',getProvinceList);
app.get('/region/region:id/province:pid',getProvinceInfo);


let Regions = [

{
   id: 1,
   region_name: "REGION I: Ilocos Region"
}, 
{
    id: 2,
    region_name:  "REGION II: Cagayan Valley"
 },
 {
    id: 3,
    region_name: "REGION III: Central Luzon" 
 },
 {
    id: 4,
    region_name:   "REGION IV-A: CALABARZON"  
 },
 {
    id: 5,
    region_name: "MIMAROPA Region" 
 },
 {
    id: 6,
    region_name:   "REGION V: Bicol Region"  
 },
 {
    id: 7,
    region_name: "REGION VI: Western Visayas" 
 },
 {
    id: 8,
    region_name:  "REGION VII: Central Visayas"   
 },
 {
    id: 9,
    region_name:  "REGION VIII: Eastern Visayas"   
 },
 {
    id: 10,
    region_name:  "REGION IX: Zamboanga Peninsula"   
 },
 {
    id: 11,
    region_name:  "REGION X:  Northern Mindanao"   
 },
 {
    id: 12,
    region_name:  "REGION XI: Davao Region"   
 },
 {
    id: 13,
    region_name:  "REGION XII: SOCCSKSARGEN"   
 },
 {
    id: 14,
    region_name:  "REGION XIII: Caraga"   
 },{
    id: 15,
    region_name:  "NCR: National Capital Region"   
 },{
    id: 16,
    region_name:  "CAR: Cordillera Administrative Region"   
 },
 {
    id: 17,
    region_name:  "BARMM: Bangsamoro Autonomous Region in Muslim Mindanao"   
 }
]



let province = [
    {
    id: 1,
    province_name: "Ilocos Norte",
    region_id: 1
    },
    {
    id: 2,
    province_name: "Ilocos Sur",
    region_id: 1
    },
    {
    id: 3,
    province_name: "La Union",
    region_id: 1
    },
    {
    id: 4,
    province_name: "Pangasinan",
    region_id: 1
    },
    {
        id: 5,
        province_name: "Batanes",
        region_id: 2
    },
    {
        id: 6,
        province_name: "Cagayan",
        region_id: 2
    },
    {
        id: 7,
        province_name: "Isabela",
        region_id: 2
    },
    {
        id: 8,
        province_name: "Nueva Vizcaya",
        region_id: 2
    },
    {
        id: 9,
        province_name: "Quirino",
        region_id: 2
    },
    {
        id: 10,
        province_name: "Angeles",
        region_id: 3
    },
    {
        id: 11,
        province_name: "Aurora",
        region_id: 3
    },
    {
        id: 12,
        province_name: "Bataan",
        region_id: 3
    },
    {
        id: 13,
        province_name: "Bulacan",
        region_id: 3
    },
    {
        id: 14,
        province_name: "Nueva Ecija",
        region_id: 3
    },
    {
        id: 15,
        province_name: "Olongapo",
        region_id: 3
    },
    {
        id: 16,
        province_name: "Pampanga",
        region_id: 3
    },
    {
        id: 17,
        province_name: "Tarlac",
        region_id: 3
    },
    {
        id: 18,
        province_name: "Zambales",
        region_id: 3
    },
    {
        id: 19,
        province_name: "Batangas",
        region_id: 4
    },
    {
        id: 20,
        province_name: "Cavite",
        region_id: 4
    },
    {
        id: 21,
        province_name: "Lucena",
        region_id: 4
    },
    {
        id: 22,
        province_name: "Laguna",
        region_id: 4
    },
    {
        id: 23,
        province_name: "Quezon",
        region_id: 4
    },
    {
        id: 24,
        province_name: "Rizal",
        region_id: 4
    },
    {
        id: 25,
        province_name: "Marinduque",
        region_id: 5
    },
    {
        id: 26,
        province_name: "Occidental Mindoro",
        region_id: 5
    },
    {
        id: 27,
        province_name: "Oriental Mindoro",
        region_id: 5
    },
    {
        id: 28,
        province_name: "Palawan",
        region_id: 5
    },
    {
        id: 29,
        province_name: "Puerto Princesa",
        region_id: 5
    },
    {
        id: 30,
        province_name: "Romblon",
        region_id: 5
    },
    {
        id: 31,
        province_name: "Albay",
        region_id: 6
    },
    {
        id: 32,
        province_name: "Camarines Norte",
        region_id: 6
    },
    {
        id: 33,
        province_name: "Camarines Sur",
        region_id: 6
    },
    {
        id: 34,
        province_name: "Catanduanes",
        region_id: 6
    },
    {
        id: 35,
        province_name: "Masbate",
        region_id: 6
    },
    {
        id: 36,
        province_name: "Sorsogon",
        region_id: 6
    },
    {
        id: 37,
        province_name: "Aklan",
        region_id: 7
    },
    {
        id: 38,
        province_name: "Antique",
        region_id: 7
    },
    {
        id: 39,
        province_name: "Bacolod",
        region_id: 7
    },
    {
        id: 40,
        province_name: "Capiz",
        region_id: 7
    },
    {
        id: 41,
        province_name: "Guimaras",
        region_id: 7
    },
    {
        id: 42,
        province_name: "Iloilo",
        region_id: 7
    },
    {
        id: 43,
        province_name: "Iloilo City",
        region_id: 7
    },
    {
        id: 44,
        province_name: "Negros Occidental",
        region_id: 7
    },
    {
        id: 45,
        province_name: "Bohol",
        region_id: 8
    },
    {
        id: 46,
        province_name: "Cebu",
        region_id: 8
    },
    {
        id: 47,
        province_name: "Cebu City",
        region_id: 8
    },
    {
        id: 48,
        province_name: "Lapu-Lapu",
        region_id: 8
    },
    {
        id: 49,
        province_name: "Mandaue",
        region_id: 8
    },
    {
        id: 50,
        province_name: "Negros Oriental",
        region_id: 8
    },
    {
        id: 51,
        province_name: "Siquijor",
        region_id: 8
    },
    {
        id: 52,
        province_name: "Biliran",
        region_id: 9
    },
    {
        id: 53,
        province_name: "Eastern Samar",
        region_id: 9
    },
    {
        id: 54,
        province_name: "Leyte",
        region_id: 9
    },
    {
        id: 55,
        province_name: "Northern Samar",
        region_id: 9
    },
    {
        id: 56,
        province_name: "Samar",
        region_id: 9
    },
    {
        id: 57,
        province_name: "Southern Leyte",
        region_id: 9
    },
    {
        id: 58,
        province_name: "Tacloban",
        region_id: 9
    },
    {
        id: 59,
        province_name: "Isabela City",
        region_id: 10
    },
    {
        id: 60,
        province_name: "Zamboanga City",
        region_id: 10
    },
    {
        id: 61,
        province_name: "Zamboanga del Norte",
        region_id: 10
    },
    {
        id: 62,
        province_name: "Zamboanga del Sur",
        region_id: 10
    },
    {
        id: 63,
        province_name: "Zamboanga Sibugay",
        region_id: 10
    },
    {
        id: 64,
        province_name: "Bukidnon",
        region_id: 11
    },
    {
        id: 65,
        province_name: "Cagayan de Oro",
        region_id: 11
    },
    {
        id: 66,
        province_name: "Camiguin",
        region_id: 11
    },
    {
        id: 67,
        province_name: "Iligan",
        region_id: 11
    },
    {
        id: 68,
        province_name: "Lanao del Norte",
        region_id: 11
    },
    {
        id: 69,
        province_name: "Misamid Occidental",
        region_id: 11
    },
    {
        id: 70,
        province_name: "Misamid Oriental",
        region_id: 11
    },
    {
        id: 71,
        province_name: "Davao de Oro",
        region_id: 12
    },
    {
        id: 72,
        province_name: "Davao City",
        region_id: 12
    },
    {
        id: 73,
        province_name: "Davao del Norte",
        region_id: 12
    },
    {
        id: 74,
        province_name: "Davao del Sur",
        region_id: 12
    },
    {
        id: 75,
        province_name: "Davao Occidental",
        region_id: 12
    },
    {
        id: 76,
        province_name: "Davao Oriental",
        region_id: 12
    },
    {
        id: 77,
        province_name: "Cotabato",
        region_id: 12
    },
    {
        id: 78,
        province_name: "Cotabato City",
        region_id: 13
    },
    {
        id: 79,
        province_name: "General Santos",
        region_id: 13
    },
    {
        id: 80,
        province_name: "Sarangani",
        region_id: 13
    },
    {
        id: 81,
        province_name: "South Cotabato",
        region_id: 13
    },
    {
        id: 82,
        province_name: "Sultan Kudarat",
        region_id: 13
    },
    {
        id: 83,
        province_name: "Agusan del Norte",
        region_id: 14
    },
    {
        id: 84,
        province_name: "Agusan del Sur",
        region_id: 14
    },
    {
        id: 85,
        province_name: "Butuan",
        region_id: 14
    },
    {
        id: 86,
        province_name: "Dinagat",
        region_id: 14
    },
    {
        id: 87,
        province_name: "Surigao del Norte",
        region_id: 14
    },
    {
        id: 88,
        province_name: "Surigao del Sur",
        region_id: 14
    },
    {
        id: 89,
        province_name: "Caloocan",
        region_id: 15
    },
    {
        id: 90,
        province_name: "Las Piñas",
        region_id: 15
    },
    {
        id: 91,
        province_name: "Makati",
        region_id: 15
    },
    {
        id: 92,
        province_name: "Malabon",
        region_id: 15
    },
    {
        id: 93,
        province_name: "Mandaluyong",
        region_id: 15
    },
    {
        id: 94,
        province_name: "Manila",
        region_id: 15
    },
    {
        id: 95,
        province_name: "Marikina",
        region_id: 15
    },
    {
        id: 96,
        province_name: "Muntinlupa",
        region_id: 15
    },
    {
        id: 97,
        province_name: "Navotas",
        region_id: 15
    },
    {
        id: 98,
        province_name: "Parañaque",
        region_id: 15
    },
    {
        id: 99,
        province_name: "Pasay",
        region_id: 15
    },
    {
        id: 100,
        province_name: "Pasig",
        region_id: 15
    },
    {
        id: 101,
        province_name: "Pateros",
        region_id: 15
    },
    {
        id: 102,
        province_name: "Quezon City",
        region_id: 15
    },
    {
        id: 103,
        province_name: "San Juan",
        region_id: 15
    },
    {
        id: 104,
        province_name: "Taguig",
        region_id: 15
    },
    {
        id: 105,
        province_name: "Valenzuela",
        region_id: 15
    },
    {
        id: 106,
        province_name: "Abra",
        region_id: 16
    },
    {
        id: 107,
        province_name: "Apayao",
        region_id: 16
    },
    {
        id: 108,
        province_name: "Baguio",
        region_id: 16
    },
    {
        id: 109,
        province_name: "Benguet",
        region_id: 16
    },
    {
        id: 110,
        province_name: "Ifugao",
        region_id: 16
    },
    {
        id: 111,
        province_name: "Kalinga",
        region_id: 16
    },
    {
        id: 112,
        province_name: "Mountain Province",
        region_id: 16
    },
    {
        id: 113,
        province_name: "Basilan",
        region_id: 17
    },
    {
        id: 114,
        province_name: "Lanao del Sur",
        region_id: 17
    },
    {
        id: 115,
        province_name: "Maguindanao",
        region_id: 17
    },
    {
        id: 116,
        province_name: "Sulu",
        region_id: 17
    },
    {
        id: 117,
        province_name: "Tawi-Tawi",
        region_id: 17
    }
]

 
function getRegions (req, res){
    res.send(Regions);
 } 

function getRegionID (req, res){
    let getID = req.params.id;
    let findRegion = Regions.find(user => user.id == getID)
    res.send(findRegion);
}

function getProvinceList (req,res) {
    let getID = req.params.id;
    const selectedprovince = province.filter(element => element.region_id == getID);
    res.send(selectedprovince);
}

function getProvinceInfo (req,res) {
    let getRegionID = req.params.id;
    let getID = req.params.pid;
    let getProvInfo = province.find(element => element.id == getID && element.region_id == getRegionID)
    res.send(getProvInfo);
}
    // let searchProvince = province.filter( (obj) => {
    //     if(obj.region_id == getID){
            
    //         students.push(newStudent);
    //         return true;
            
    //     }
    //     return false;
    // })

    // for (let i = 0; i < getID; i++)
    // { 
    // findProvince = province.find(user => user.region_id == getID)
    // }
    // res.send(findProvince + getID);

    // //
    // const groupByCategory = province.reduce((group, province) => {
    //     const { region_id } = province;
    //     group[region_id] = province[region_id] ?? [];
    //     group[region_id].push(province);
    //     return group;
    //   }, {});
    //   res.send(groupByCategory.getID);
//}

// app.get('/region/region_id/province',getID);

// function getID (req,res) {
//     res.send(province)
//     // var indexObject= students.findIndex( object => {
//     //     return object.id == req.params.id
//     // });

//     // if (students[indexObject] === undefined)
//     // {   
//     // res.send('Student ID doesnt exist')
//     // }
//     // else
//     // {
//     // res.send(students[indexObject])
//     // }
// }

// app.get('/:id', (req, res) => { //done
// let idholder = req.params.id - 1
// res.send(students[idholder])
//res.send(students)
// })


// let students = [
//     {
//         id: 1,
//         name: "Justin"
//     },
//     {
//         id: 1,
//         name: "Jane"
//     },
//     {
//         id: 2,
//         name: "Labini"
//     },
//     {
//         id: 3,
//         name: "Mingoy"
//     }
// ];
// app.post('/:name',addNewStud);

// function addNewStud(req,res){
//     var newStudent = {
//         id: students.at(-1).id + 1,
//         name: req.params.name
//     }
// students.push(newStudent);
// res.send(students)
// }

// // app.post('/:name', (req, res) => { //done
// // var newStudent = {
// //     id: students.at(-1).id + 1,
// //     name: req.params.name
// // }
// // students.push(newStudent);
// // res.send(students)
// // })

// app.put('/:name/:id',updateStud);

// function updateStud(req,res){
//     var indexObject= students.findIndex( object => {
//         return object.id == req.params.id
//     });
//     if (students[indexObject] === undefined)
//     {   
//     res.send('Student ID doesnt exist')
//     }
//     else
//     {
//     students[indexObject].name = req.params.name
//     res.send(students)
//     }
// }
// app.put('/:name/:id', (req, res) => {
//     var indexObject= students.findIndex( object => {
//         return object.id == req.params.id
//     });
//     students[indexObject].name = req.params.name
//     res.send(students)
// })


// app.delete('/:id',deleteStud);

// function deleteStud(req,res){
//     var indexObject= students.findIndex( object => {
//         return object.id == req.params.id
//     });
//      if (students[indexObject] === undefined)
//     {   
//      res.send('Cant delete something that doesnt exist')
//      }
//      else
//      {
//         res.send("Student "+students[indexObject].name + " is remove from the student list.")
//          students.splice(indexObject,1)
//      }
// }
// // app.delete('/:id', (req, res) => { // almost done
// //     var indexObject= students.findIndex( object => {
// //         return object.id == req.params.id
// //     });
// // students.splice(indexObject,1)
// // res.send(students)
// // })  


module.exports = app;