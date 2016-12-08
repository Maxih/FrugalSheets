@documents.each do |document|
  json.set! document.id do
    json.partial! 'document', document: document
  end
end
