import { Observable, OperatorFunction, timer } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 *
 */
export const executeDelayed = <T>(fn: () => void, delay: number = 0): OperatorFunction<T, T> => {
  return (source: Observable<T>): Observable<T> => {
    let timerSub = timer(delay).subscribe(() => fn());
    return source.pipe(
      tap(
        () => {
          timerSub.unsubscribe();
          timerSub = timer(delay).subscribe(() => fn());
        },
        () => timerSub.unsubscribe(), // unsubscribe on error
        () => timerSub.unsubscribe()
      )
    );
  };
};
