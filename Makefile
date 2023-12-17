ifeq (,$(wildcard .env))
$(shell cp .env.example .env)
endif

include .env

include *.mk