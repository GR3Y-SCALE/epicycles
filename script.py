import re

def parse_svg_path(svg_path):
    path_pattern = r'[ML]\s*([-\d.e]+)[, ]\s*([-\d.e]+)' # Regex to turn M and L into {x: ..., y: ...}
    points = re.findall(path_pattern, svg_path)

    js_points = [{'x': float(x), 'y': float(y)} for x, y in points]
    return js_points

def main():
    with open("path.txt", "r") as file:
        svg_data = file.read()

    js_points = parse_svg_path(svg_data)

    with open("path.js", "w") as outfile:
        outfile.write("let drawing = [\n")
        for point in js_points:
            outfile.write(f"    {{ x: {point['x']}, y: {point['y']} }},\n")
        outfile.write("];\n")

if __name__ == "__main__":
    main()