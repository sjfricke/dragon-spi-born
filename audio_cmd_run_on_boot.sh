#!/bin/bash
amixer -c 0 cset iface=MIXER,name='SPK DAC Switch' 1
amixer -c 0 cset iface=MIXER,name='RX3 MIX1 INP1' 'RX1'
amixer cset iface=MIXER,name='ADC2 Volume' 4
amixer cset iface=MIXER,name='RX3 Digital Volume' 116
