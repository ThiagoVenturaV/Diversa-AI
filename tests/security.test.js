import assert from 'node:assert/strict'
import test from 'node:test'

import { safeHttpUrl } from '../src/security.js'

test('accepts only HTTP(S) source URLs', () => {
  assert.equal(safeHttpUrl('https://diversa.org.br/artigo'), 'https://diversa.org.br/artigo')
  assert.equal(safeHttpUrl('http://localhost:8080/teste'), 'http://localhost:8080/teste')
  assert.equal(safeHttpUrl('javascript:alert(1)'), null)
  assert.equal(safeHttpUrl('data:text/html,malicious'), null)
  assert.equal(safeHttpUrl('not a URL'), null)
})
