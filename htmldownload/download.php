<?php

// Create a URL handle.
$ch = curl_init();

// Tell curl what URL we want.
curl_setopt($ch, CURLOPT_URL, "https://smartlife.aviva.pl/smartlife/?&_ga=2.155920827.1825328042.1493313300-830074265.1490275200#!/Symulacja");

// We want to return the web page from curl_exec, not 
// print it.
curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);

// Set this if you don't want the content header.
curl_setopt($ch, CURLOPT_HEADER, 0);

// Download the HTML from the URL.
$content = curl_exec($ch);
echo($content);

// Check to see if there were errors.
if(curl_errno($ch)) {
    // We have an error. Show the error message.
    echo curl_error($ch);
}
else {
    // No error. Save the page content.
    $file = 'content.html';
    
    // Open a file for writing.
    $fh = fopen($file, 'w');
    
    if(!$fh) {
        // Couldn't create the file.
        echo "Unable to create $file";
    }
    else {
        // Write the retrieved
        // html to the file.
        fwrite($fh, $content);
        
        // Display a message to say
        // we've saved the file OK.
        echo "Saved $file";
        
        // Close the file.
        fclose($fh);
    }
}

// Close the curl handle.
curl_close($ch);

?>
