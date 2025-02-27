import { create } from 'zustand'
import { combine, subscribeWithSelector, persist, createJSONStorage } from 'zustand/middleware'

export const useCountStore = create(
   persist(
      subscribeWithSelector(
         combine(
            {
               count: 0,
               double: 0
            },
            (set, get) => ({
               increase: () => {
                  set(state => ({
                     count:state.count + 1
                  }))
               },
               decrease: () => {
                  const { count } = get()
                  set({ count: count - 1 })
               }
            })
         )
      ), // 상태
      {
         name: 'countStore',
         // 기본은 로컬저장소, 아래 코드로 세션저장소에 저장 가능
         // storage: createJSONStorage(() => sessionStorage)
         partialize: (state) => {
            count: state.count // 선택적으로 원하는 상태만 저장 가능
         },
         version: 0
      } // 옵션
   )
)

// count가 바뀌면 뒤에 메서드 실행
useCountStore.subscribe(
   state => state.count,
   (count) => {
      useCountStore.setState({
         double: count * 2
      })
   }
)