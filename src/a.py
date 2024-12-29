import os

def list_files_and_print_content(base_dir, ignore_files=[], ignore_dirs=[]):
    for root, dirs, files in os.walk(base_dir):
        # Skip directories that should be ignored
        dirs[:] = [d for d in dirs if d not in ignore_dirs]

        for file in files:
            # Skip files that should be ignored
            if file not in ignore_files:
                file_path = os.path.join(root, file)
                print(f"\n=== {file_path} ===")
                try:
                    with open(file_path, 'r') as f:
                        content = f.read()
                        print(content)
                except Exception as e:
                    print(f"Could not read {file_path}: {e}")

# Define the base directory
base_dir = '.'

# Specify files and directories to ignore
ignore_files = ['ignored_file.txt', 'example.ignore', 'favicon.png', 'Animation - 1734246803250.webm']
ignore_dirs = ['node_modules', '.next', '.git', 'api', 'lessons', 'level1', 'level2', 'level3', 'level4', 'Section1', 'Section2', 'Section3', 'Section4', 'dist']

# Run the function to list files and print their content
list_files_and_print_content(base_dir, ignore_files, ignore_dirs)
