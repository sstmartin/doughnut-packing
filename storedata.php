<?php
    $trialuser = $_POST['sendthis'];
    $trialexperiment = $_POST['andthis'];
    $times = $_POST['andalsothis'];
    
    #$command = escapeshellcmd('python /home/zo/public/storedata.py ' . $trialinfo . ' ' . $times);
    #$output = shell_exec($command);
    
    $date = date('m/d/Y h:i:s a', time());
    
    #$file = fopen("/home/zo/public/writehere.txt","a");
    $file = fopen("/var/www/doughnuts/results.txt","a");
    
    $writethis = "\n" . $date . "\n" . "User: " . $trialuser . " Experiment: " . $trialexperiment . "\n" . 'Times: ' . $times . "\n";
    
    fwrite($file,$writethis);
    fclose($file);
    
    $output = 'PHP Written';
    
    echo $output;
?>