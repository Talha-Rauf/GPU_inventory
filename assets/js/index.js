
$("#add-user").onsubmit(function(event){
    alert("Data Inserted Successfully!")
});

$("#update_user").submit(function(event){
    event.preventDefault()

    const unindexed_array = $(this).serializeArray();
    const data = {};

    $.map(unindexed_array, function (n,i){
        data[n['name']] = n['value']
    })

    console.log(data);

    const request = {
        "url": `http://localhost:8080/users/update-user/${data.id}`,
        "method": "PUT",
        "data": data
    };

    $.ajax(request).done(function (response){
        alert("Data Updated Successfully!")
    })
})