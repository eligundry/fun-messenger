#!/bin/bash

/usr/local/bin/gunicorn \
    --worker-class eventlet \
    -w 1 \
    --bind=0.0.0.0:8000 \
    --reload \
    fun_messenger.entrypoints.web:app
