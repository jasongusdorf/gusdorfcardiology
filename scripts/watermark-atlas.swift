#!/usr/bin/env swift

import AppKit

guard CommandLine.arguments.count == 3 else {
  fputs("usage: watermark-atlas.swift INPUT OUTPUT\n", stderr)
  exit(64)
}

let input = CommandLine.arguments[1]
let output = CommandLine.arguments[2]

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

context.draw(source, in: CGRect(x: 0, y: 0, width: width, height: height))

let graphicsContext = NSGraphicsContext(cgContext: context, flipped: false)
NSGraphicsContext.saveGraphicsState()
NSGraphicsContext.current = graphicsContext

let label = "Gusdorf Cardiology" as NSString
let attributes: [NSAttributedString.Key: Any] = [
  .font: NSFont.systemFont(ofSize: CGFloat(width) * 0.061, weight: .semibold),
  .foregroundColor: NSColor.white.withAlphaComponent(0.50),
]
let size = label.size(withAttributes: attributes)

context.translateBy(x: CGFloat(width) / 2, y: CGFloat(height) / 2)
context.rotate(by: 24 * .pi / 180)
label.draw(
  at: CGPoint(x: -size.width / 2, y: -size.height / 2),
  withAttributes: attributes
)

NSGraphicsContext.restoreGraphicsState()

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
