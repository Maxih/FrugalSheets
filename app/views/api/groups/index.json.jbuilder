json.array!(@groups) do |group|
  json.partial! 'group', group: group
end
