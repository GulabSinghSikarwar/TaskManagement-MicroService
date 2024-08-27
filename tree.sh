#!/bin/bash

# Loop through all items in the current directory
for item in *; do
  if [ -d "$item" ]; then
    # Print the directory name
    echo "[DIR]  $item"
    
    # Loop through items in the subdirectory
    for subitem in "$item"/*; do
      if [ -d "$subitem" ]; then
        echo "  [DIR]  $subitem"
      else
        echo "  [FILE] $subitem"
      fi
    done
  else
    echo "[FILE] $item"
  fi
done
