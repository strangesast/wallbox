#!/bin/bash
VOLUME=${1:-50%}
amixer -D pulse sset Master "$VOLUME"
