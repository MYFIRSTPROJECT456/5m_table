var helpers =
{
    buildDropdown: function(result, dropdown, emptyMessage)
    {
    	var i=0;
        // Remove current options
        dropdown.html('');
        // Add the empty option with the empty message
        dropdown.append('<option value="">' + emptyMessage + '</option>');
        // Check result isnt empty
        if(result)
        {
            // Loop through each of the results and append the option to the dropdown
            $.each(result, function(k, v) {
              if(i==0 && result.length == 1){
                dropdown.append('<option value="' + v.id + '" selected >' + v.name + '</option>');
          		}
          		else
          		{
          		dropdown.append('<option value="' + v.id + '">' + v.name + '</option>');	
          		}
          		i++;
            });
        }
    }
}