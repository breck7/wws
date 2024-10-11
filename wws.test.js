#! /usr/bin/env node

const tap = require("tap")
const fs = require("fs")
const path = require("path")
const { TestRacer } = require("scrollsdk/products/TestRacer.js")
const { WWSCli } = require("./wws.js")

const testParticles = {}

testParticles.basics = areEqual => {
  // Arrange
  const wws = new WWSCli()
  // Act/Assert
  areEqual(!!wws, true)
}

testParticles.server = async areEqual => {
  // Arrange
  const wws = new WWSCli()
  // Act/Assert
  await wws.startCommand()

  await wws.stop()

  areEqual(true, true, "Server started and stopped successfully.")
}

if (module && !module.parent) TestRacer.testSingleFile(__filename, testParticles)

module.exports = { testParticles }
