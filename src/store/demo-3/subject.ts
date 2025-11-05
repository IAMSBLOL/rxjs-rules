import { Subject } from 'rxjs'

export const fetchListTrigger$ = new Subject<string | void>()
export const fetchDetailsTrigger$ = new Subject<string | void>()