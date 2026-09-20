#!/usr/bin/env swift

import AppKit

guard CommandLine.arguments.count == 3 || CommandLine.arguments.count == 5 else {
  fputs("usage: watermark-atlas.swift INPUT OUTPUT [EXISTING_OPACITY NEW_OPACITY]\n", stderr)
  exit(64)
}

let input = CommandLine.arguments[1]
let output = CommandLine.arguments[2]
let existingOpacity = CommandLine.arguments.count == 5 ? Double(CommandLine.arguments[3]) : 0
let newOpacity = CommandLine.arguments.count == 5 ? Double(CommandLine.arguments[4]) : 0.15

guard let existingOpacity, let newOpacity,
      (0...1).contains(existingOpacity), (0...1).contains(newOpacity) else {
  fputs("opacities must be numbers from 0 through 1\n", stderr)
  exit(64)
}

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

if existingOpacity > 0 {
  guard let maskContext = CGContext(
    data: nil,
    width: width,
    height: height,
    bitsPerComponent: 8,
    bytesPerRow: width * 4,
    space: CGColorSpaceCreateDeviceRGB(),
    bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
  ) else {
    fputs("could not create watermark mask\n", stderr)
    exit(70)
  }
  drawLabel(in: maskContext, opacity: 1)

  guard let pixels = context.data?.assumingMemoryBound(to: UInt8.self),
        let mask = maskContext.data?.assumingMemoryBound(to: UInt8.self) else {
    fputs("could not access image pixels\n", stderr)
    exit(70)
  }

  for y in 0..<height {
    for x in 0..<width {
      let offset = y * context.bytesPerRow + x * 4
      let maskOffset = y * maskContext.bytesPerRow + x * 4
      let coverage = Double(mask[maskOffset + 3]) / 255
      if coverage == 0 { continue }
      let oldAlpha = coverage * existingOpacity
      let replacementAlpha = coverage * newOpacity
      for channel in 0..<3 {
        let observed = Double(pixels[offset + channel])
        let original = (observed - 255 * oldAlpha) / (1 - oldAlpha)
        let replacement = original * (1 - replacementAlpha) + 255 * replacementAlpha
        pixels[offset + channel] = UInt8(max(0, min(255, replacement)).rounded())
      }
    }
  }
} else {
  drawLabel(in: context, opacity: newOpacity)
}

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
