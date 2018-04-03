#!/bin/bash

/usr/local/bin/gunicorn \
    --worker-class eventlet \
    -w 1 \
    fun_messenger.entrypoints.web:app
