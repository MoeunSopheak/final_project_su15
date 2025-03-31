
var form = document.getElementById("myForm"),
imgInput = document.querySelector(".img"),
file = document.getElementById("imgInput"),
userName = document.getElementById("name"),
position = document.getElementById("position"),
date = document.getElementById("date"),
submitBtn = document.querySelector(".submit"),
userInfo = document.getElementById("data"),
modal = document.getElementById("userForm"),
modalTitle = document.querySelector("#userForm .modal-title"),
newUserBtn = document.querySelector(".newUser")


let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

let isEdit = false, editId
showInfo()

newUserBtn.addEventListener('click', ()=> {
submitBtn.innerText = 'Submit',
modalTitle.innerText = "Fill the Form"
isEdit = false
imgInput.src = "./image/Profile Icon.webp"
form.reset()
})

file.onchange = function(){
if(file.files[0].size < 1000000){  // 1MB = 1000000
    var fileReader = new FileReader();

    fileReader.onload = function(e){
        imgUrl = e.target.result
        imgInput.src = imgUrl
    }

    fileReader.readAsDataURL(file.files[0])
}
else{
    alert("This file is too large!")
}
}

function showInfo(){
document.querySelectorAll('.employeeDetails').forEach(info => info.remove())
getData.forEach((element, index) => {
    let createElement = `<tr class="employeeDetails">
        <td>${index+1}</td>
        <td>${element.employeeName}</td>
        <td>${element.employeePosition}</td>
        <td>${element.employeeDate}</td>
        <td>
            <button class="btn btn-success" onclick="readInfo('${element.employeeName}', '${element.employeePosition}', '${element.employeeDate}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>
            <button class="btn btn-primary" onclick="editInfo(${index}, '${element.employeeName}', '${element.employeePosition}', '${element.employeeDate}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>
            <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
        </td>
    </tr>`
    userInfo.innerHTML += createElement
})
}

function readInfo(name, position, date){
document.querySelector('#showName').value = name
document.querySelector("#showPosition").value = position
document.querySelector("#showDate").value = date
}

function editInfo(index, name, position, date){
isEdit = true
editId = index
userName.value = name
position.value = position
date.value = date

submitBtn.innerText = "Update"
modalTitle.innerText = "Update The Form"
}

function deleteInfo(index){
if(confirm("Are you sure want to delete?")){
    getData.splice(index, 1)
    localStorage.setItem("userProfile", JSON.stringify(getData))
    showInfo()
}
}

form.addEventListener('submit', (e)=> {
e.preventDefault()

const information = {
    picture: imgInput.src == undefined ? "./image/Profile Icon.webp" : imgInput.src,
    employeeName: userName.value,
    employeePosition: position.value,
    employeeDate: date.value,
}

if(!isEdit){
    getData.push(information)
}
else{
    isEdit = false
    getData[editId] = information
}

localStorage.setItem('userProfile', JSON.stringify(getData))

submitBtn.innerText = "Submit"
modalTitle.innerHTML = "Fill The Form"

showInfo()

form.reset()

imgInput.src = "./image/Profile Icon.webp"  
})
