import { Observable } from 'rxjs';
import { Empty } from 'wallbox-proto/wallbox_grpc_web_pb';

export function wrapUnaryStream(fn, ...args) {
  return Observable.create(observer => {
    const call = fn.apply(null, args);
    call.on('data', response => observer.next(response));
    call.on('error', err => observer.error(err));
    call.on('status', s => {
      // could return two observables, one with data / one with status
      observer.complete();
    });
    return () => call.cancel();
  });
}

export function wrapUnaryUnary(fn, arg = new Empty(), meta = {}) {
  return Observable.create(observer => {
    const call = fn.call(null, arg, meta, (err, result) => {
      if (err) {
        observer.error(err);
      } else {
        observer.next(result);
      }
      observer.complete();
    });
    return () => call.cancel();
  });
}
