FROM envoyproxy/envoy
COPY envoy/dev.yaml /etc/envoy/envoy.yaml
CMD ["/usr/local/bin/envoy", "-c", "/etc/envoy/envoy.yaml"]
