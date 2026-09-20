#!/usr/bin/env swift

import AppKit

guard CommandLine.arguments.count == 3 else {
  fputs("usage: watermark-atlas.swift CLEAN_INPUT OUTPUT\n", stderr)
  exit(64)
}

let input = CommandLine.arguments[1]
let output = CommandLine.arguments[2]
let newOpacity = 0.15

guard let image = NSImage(contentsOfFile: input),
      let source = image.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
  fputs("could not read input image\n", stderr)
  exit(65)
}

let width = source.width
let height = source.height
guard let context = CGContext(
  data: nil,
  width: width,
  height: height,
  bitsPerComponent: 8,
  bytesPerRow: 0,
  space: CGColorSpaceCreateDeviceRGB(),
  bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
) else {
  fputs("could not create drawing context\n", stderr)
  exit(70)
}

let label = "Gusdorf Cardiology" as NSString
let baseAttributes: [NSAttributedString.Key: Any] = [
  .font: NSFont.systemFont(ofSize: CGFloat(width) * 0.061, weight: .semibold),
  .foregroundColor: NSColor.white,
]
let size = label.size(withAttributes: baseAttributes)

func drawLabel(in target: CGContext, opacity: Double) {
  let graphicsContext = NSGraphicsContext(cgContext: target, flipped: false)
  NSGraphicsContext.saveGraphicsState()
  NSGraphicsContext.current = graphicsContext
  let attributes: [NSAttributedString.Key: Any] = [
    .font: NSFont.systemFont(ofSize: CGFloat(width) * 0.061, weight: .semibold),
    .foregroundColor: NSColor.white.withAlphaComponent(opacity),
  ]
  target.translateBy(x: CGFloat(width) / 2, y: CGFloat(height) / 2)
  target.rotate(by: 24 * .pi / 180)
  label.draw(at: CGPoint(x: -size.width / 2, y: -size.height / 2), withAttributes: attributes)
  NSGraphicsContext.restoreGraphicsState()
}

context.draw(source, in: CGRect(x: 0, y: 0, width: width, height: height))
drawLabel(in: context, opacity: newOpacity)

guard let result = context.makeImage() else {
  fputs("could not create output image\n", stderr)
  exit(70)
}

let rep = NSBitmapImageRep(cgImage: result)
guard let data = rep.representation(using: .png, properties: [:]) else {
  fputs("could not encode PNG\n", stderr)
  exit(70)
}

try data.write(to: URL(fileURLWithPath: output), options: .atomic)
