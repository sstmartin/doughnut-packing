<?php
    $trialuser = $_POST['sendthis'];
    $trialexperiment = $_POST['andthis'];
    $times = $_POST['andalsothis'];
    $resumptions = $_POST['resumptions'];
    $ttimes = $_POST['ttimes'];
    $dumpd = $_POST['dumpd'];
    
    #$command = escapeshellcmd('python /home/zo/public/storedata.py ' . $trialinfo . ' ' . $times);
    #$output = shell_exec($command);
    
    $date = date('m/d/Y h:i:s a', time());
    
    #$file = fopen("/home/zo/public/writehere.txt","a");
    if($trialexperiment == -555) {
        $file = fopen("/var/www/html/experiment/results/practice.txt","a");
    }
    else {
        $file = fopen("/var/www/html/experiment/results/trials.txt","a");
    }
    
    $writethis = "\n" . $date . "\n" . "User: " . $trialuser . " Experiment: " . $trialexperiment . "\n" . 'Times: ' . $times . "\n" . "Resumption Spots: " . $resumptions . "\n" . "Trial Times: " . $ttimes . "\n" . "Subtask Dump: " . $dumpd . "\n";
    
    fwrite($file,$writethis);
    fclose($file);
    
    $output = 'PHP Written';
    
    echo $output;
?>