#!/usr/bin/env python

import sys
import datetime

#trialinfo = str(sys.argv[1])
#times = str(sys.argv[2])

i = datetime.datetime.now()

file = open("writehere.txt","w")
#file.write("TRIALINFO: " + trialinfo + "\n" + "TIMES: " + times)

print "FILE WRITTEN"