vendor-gen:
	curl \
		http://$(IGLU_DOMAIN):${PORT}/api/auth/keygen \
		-X POST \
		-H 'apikey: ${IGLU_SUPER_API_KEY}' \
		-d '{"vendorPrefix":"com.chillzone"}'

schema-publish:
	@curl http://$(IGLU_DOMAIN):${PORT}/api/schemas?isPublic=true -X POST -H "apikey: ${IGLU_SUPER_API_KEY}" -d @./snowplow/iglu/schemas/com.chillzone/filter_artist/jsonschema/1-0-0
	@curl http://$(IGLU_DOMAIN):${PORT}/api/schemas?isPublic=true -X POST -H "apikey: ${IGLU_SUPER_API_KEY}" -d @./snowplow/iglu/schemas/com.chillzone/filter_topic/jsonschema/1-0-0
	@curl http://$(IGLU_DOMAIN):${PORT}/api/schemas?isPublic=true -X POST -H "apikey: ${IGLU_SUPER_API_KEY}" -d @./snowplow/iglu/schemas/com.chillzone/play_music/jsonschema/1-0-0

checkstatus:
	curl http://${SNOWPLOW_DOMAIN}:${PORT}/micro/iglu/com.chillzone/filter_artist/jsonschema/1-0-0