function confirmItemDeletion() {
    var itemId;
    const deleteForm = document.forms["delete-item-form"];
    const btnDeleteItem = document.querySelector("#btn-delete-item");
    const deleteItemModal = document.getElementById('delete-item-modal');
    deleteItemModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget //an inbuild property in jQuery
        itemId = button.getAttribute('data-id');
    });
    btnDeleteItem.onclick = function() { 
        deleteForm.id.value = itemId;
        deleteForm.submit();  
    }
}

function toggle() {
    document.getElementById("common_interface-l_sidebar").classList.toggle("toggle_active1");
    document.getElementById("common_interface-header").classList.toggle("toggle_active2");
    document.getElementById("common_content-area").classList.toggle("toggle_active2");
}


function activateModalAddingForm() {
    // block of code for adding
    const addBtn = document.querySelector(".js-add-info");
    const modalAddingForm = document.querySelector(".js-modal-adding_form");
    const closeBtn = document.querySelector(".js-modal-action_form-close");
    const modalContainer = document.querySelector(".js-modal-action_form-container");

    // block of code for editing
    //const editBtns = document.querySelectorAll(".js-edit-info");
    //const modalEditingForm = document.querySelector(".js-modal-editing_form");

    function showAddingForm() {
        modalAddingForm.classList.add("open");
    }

    function hideActionForm() {
        modalAddingForm.classList.remove("open");
        //modalEditingForm.classList.remove("open");
    }
    
    /*function showEditingForm() {
        modalEditingForm.classList.add("open");
    }*/

    /*for(const editBtn of editBtns) {
        editBtn.addEventListener("click", showEditingForm);
    }*/

    //for(const closeBtn of closeBtns) {
    closeBtn.addEventListener("click", hideActionForm);
    //}

    addBtn.addEventListener("click", showAddingForm);
    
    //modalEditingForm.addEventListener("click", hideActionForm);
    modalAddingForm.addEventListener("click", hideActionForm);

    //for(const modalContainer of modalContainers) {
    modalContainer.addEventListener("click", event => event.stopPropagation());    
    //}
}

function previewImageAndClose() {
    const chosenImgContainer = document.querySelector(".chosen_image-container");
    const img = document.querySelector("#chosenImage");
    const uploadBtn = document.querySelector("#btn-upload-img");
    const cancelBtn = document.querySelector("#cancel-btn");

    uploadBtn.addEventListener("change", function() {
        const file = this.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = function() {
                const result = reader.result;
                img.src = result;
                chosenImgContainer.classList.add("active");
            }
            cancelBtn.addEventListener("click", function() {
                img.src = "";
                chosenImgContainer.classList.remove("active");
            });
            reader.readAsDataURL(file);
        }else {
            img.src = "";
        }
    });
}

function previewImage() {
    const previewImg = document.querySelector("#previewImage");
    const uploadBtnP = document.querySelector("#btn-add-img");

    uploadBtnP.addEventListener("change", function() {
        const file = this.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = function() {
                const result = reader.result;
                previewImg.src = result;
            }
            reader.readAsDataURL(file);
        }else {
            previewImg.src = "";
        }
    });
}

function imageSliderTimer(time, numberOfPictures) {
    var counter = 2;
    setInterval(function() {
        document.getElementById("radio" + counter).checked = true;
        counter++;
        if(counter > numberOfPictures) counter = 1;
    }, time);
}

function validateAdminAcc() {
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const emailMsg = document.getElementById("email-msg");
    const nameMsg = document.getElementById("name-msg");
    const addressMsg = document.getElementById("address-msg");
    const result = /^\s*[a-z]+[a-z0-9]+@fpt.edu.vn\s*$/i.test(email); //emailRe 
    const result2 = /^\s*[a-z]{2,}\s+[a-z]{2,}[a-z\s]*$/i.test(name); 
    const result3 = /^\s*[a-z0-9]+[a-z0-9\s]*$/i.test(address);
    emailMsg.innerHTML = result ? "" : "Please enter a valid email address."; 
    nameMsg.innerHTML = result2 ? "" : "Please enter a valid name."; 
    addressMsg.innerHTML = result3 ? "" : "Please enter a valid address."; 
    console.log(result && result2 && result3);
    return result && result2 && result3; 
}