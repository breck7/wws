#! /usr/bin/env node

const tap = require("tap")
const fs = require("fs")
const path = require("path")
const { TestRacer } = require("scrollsdk/products/TestRacer.js")
const { WWSCli } = require("./wws.js")

const testTree = {}

testTree.basics = areEqual => {
  // Arrange
  const wws = new WWSCli()
  // Act/Assert
  areEqual(!!wws, true)
}

if (module && !module.parent) TestRacer.testSingleFile(__filename, testTree)

module.exports = { testTree }
