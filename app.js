document.addEventListener('DOMContentLoaded', function () {
    // Initialize DataTable
    $('#example').DataTable({
        scrollY: '600px',
        scrollCollapse: true,
        paging: true
    });

    let getData = localStorage.getItem('customers') ? JSON.parse(localStorage.getItem('customers')) : []

    let isEdit = false, editId

    showInfo()

    var form = document.getElementById('addNewForm')
    var customer_Name = document.getElementById('customerName')
    var customer_Address = document.getElementById('customerAddress')    
    var deliveryDate = document.getElementById('deliveryDate')

    var addNewModal
       // Show modal when "Add New" button is clicked
       document.getElementById('addNewBtn').addEventListener('click', function () {
        addNewModal = new bootstrap.Modal(document.getElementById('addNewModal'), {
            backdrop: 'static',
            keyboard: false
        });
        addNewModal.show();
        document.querySelector('.submitBtn').innerText = 'Submit'
        document.querySelector('.modal-title').inneText = "Add New Customer"
        isEdit = false
        document.getElementById('addNewForm').reset()
    });

    function showInfo(){

         // Get the DataTable instance
        let table = $('#example').DataTable();
        table.clear(); // Clear existing data in the DataTable

        getData.forEach((element, index) => {

        // Add the row to the DataTable
        table.row.add([
            index + 1,
            element.customerName,
            element.customerAddress,            
            element.deliveryDate,
            `<td class="actionIcon">
                <button class="actionBtn" onclick="editInfo(${index}, '${element.customerName}', '${element.customerAddress}', '${element.deliveryDate}')">Editar</button>

                <button class="actionBtn" onclick="deleteInfo(${index})">Delete</button>
            </td>`
        ]);
        })

        // Redraw the DataTable to display the new rows
        table.draw();
    }
    showInfo()


    window.editInfo = function(index, name, address, deDate) {
        isEdit = true
        editId = index
        customer_Name.value = name
        customer_Address.value = address        
        deliveryDate.value = deDate
        document.querySelector('.submitBtn').innerText = 'Update'
        document.querySelector('.modal-title').innerText = "Update The Form"

        addNewModal = new bootstrap.Modal(document.getElementById('addNewModal'), {
            backdrop: 'static',
            keyboard: false
        });
        addNewModal.show();
        
        document.querySelector('.submitBtn').innerText = 'Update'
        document.querySelector('.modal-title').innerText = "Update The Form"
    }

    window.deleteInfo = function(index) {
        if (confirm("Seguro que quieres borrar este instrumento o material?")) {
            getData.splice(index, 1);
            localStorage.setItem('customers', JSON.stringify(getData));
            showInfo();
        }
    }

    form.addEventListener('submit', (e)=> {
        e.preventDefault()
    
        const information = {
            customerName: customer_Name.value,
            customerAddress: customer_Address.value,            
            deliveryDate: deliveryDate.value,
        }
    
        if(!isEdit){
            getData.push(information)
        }
        else{
            isEdit = false
            getData[editId] = information
        }
    
        localStorage.setItem('customers', JSON.stringify(getData))
    
        document.querySelector('.submitBtn').innerText = 'Añadir'
        document.querySelector('.modal-title').inneText = "Añadir nuevo instrumento o material"
    
        showInfo()

            // Close the modal after submission
            addNewModal.hide();

        form.reset()
    })

});