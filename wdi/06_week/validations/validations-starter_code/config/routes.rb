Rails.application.routes.draw do
  get "users" => "users#index"
  post "users" => "users#create"
  get "signup" => "users#new"

  #routes for login
  get "login" => "sessions#new"
  post "login" => "sessions#create"
  delete "logout" => "sessions#destroy"
end
