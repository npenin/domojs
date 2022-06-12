(module
 (type $none_=>_none (func))
 (type $i32_=>_i32 (func (param i32) (result i32)))
 (type $i32_i32_i32_i32_=>_none (func (param i32 i32 i32 i32)))
 (import "env" "abort" (func $~lib/builtins/abort (param i32 i32 i32 i32)))
 (global $~lib/symbol/nextId (mut i32) (i32.const 12))
 (global $assembly/core/bufferInstance (mut i32) (i32.const 0))
 (global $~lib/memory/__data_end i32 (i32.const 76))
 (global $~lib/memory/__stack_pointer (mut i32) (i32.const 16460))
 (global $~lib/memory/__heap_base i32 (i32.const 16460))
 (memory $0 1)
 (data (i32.const 12) "<\00\00\00\00\00\00\00\00\00\00\00\01\00\00\00 \00\00\00i\00s\00B\00u\00f\00f\00e\00r\00I\00n\00s\00t\00a\00n\00c\00e\00\00\00\00\00\00\00\00\00\00\00\00\00")
 (table $0 1 1 funcref)
 (elem $0 (i32.const 1))
 (export "memory" (memory $0))
 (start $~start)
 (func $~lib/symbol/Symbol (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  global.get $~lib/symbol/nextId
  local.tee $1
  i32.const 1
  i32.add
  global.set $~lib/symbol/nextId
  local.get $1
  local.set $2
  local.get $2
  i32.eqz
  if
   unreachable
  end
  local.get $2
 )
 (func $start:assembly/index
  call $start:assembly/core
 )
 (func $~start
  call $start:assembly/index
 )
 (func $~stack_check
  global.get $~lib/memory/__stack_pointer
  global.get $~lib/memory/__data_end
  i32.lt_s
  if
   i32.const 16480
   i32.const 16528
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
 )
 (func $start:assembly/core
  (local $0 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  call $~stack_check
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  i32.const 32
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $~lib/symbol/Symbol
  global.set $assembly/core/bufferInstance
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
)
