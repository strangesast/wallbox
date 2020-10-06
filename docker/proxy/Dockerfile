#FROM envoyproxy/envoy
FROM envoyproxy/envoy:v1.15.0
COPY envoy/prod.yaml /etc/envoy/envoy.yaml
CMD ["/usr/local/bin/envoy", "-c", "/etc/envoy/envoy.yaml"]
